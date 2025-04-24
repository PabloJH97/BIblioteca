import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableSkeleton } from "@/components/stack-table/TableSkeleton";
import { UserLayout } from "@/layouts/users/UserLayout";
import { User, useDeleteUser, useUsers } from "@/hooks/users/useUsers";
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { useState, useMemo } from "react";
import { Link, usePage } from "@inertiajs/react";
import { useTranslations } from "@/hooks/use-translations";
import { Table } from "@/components/stack-table/Table";
import { createTextColumn, createDateColumn, createActionsColumn } from "@/components/stack-table/columnsTable";
import { DeleteDialog } from "@/components/stack-table/DeleteDialog";
import { FiltersTable, FilterConfig } from "@/components/stack-table/FiltersTable";
import { toast } from "sonner";
import { ColumnDef, Row } from "@tanstack/react-table";
import { FloorLayout } from "@/layouts/floors/FloorLayout";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FloorForm } from "./components/FloorForm";

interface IndexFloorProps{
    data: any[];
}

export default function FloorsIndex2({data}:IndexFloorProps ){
  const { t } = useTranslations();
  const { url } = usePage();

  // Obtener los parámetros de la URL actual
  const urlParams = new URLSearchParams(url.split('?')[1] || '');
  const pageParam = urlParams.get('page');
  const perPageParam = urlParams.get('per_page');

  // Inicializar el estado con los valores de la URL o los valores predeterminados
  const [currentPage, setCurrentPage] = useState(pageParam ? parseInt(pageParam) : 1);
  const [perPage, setPerPage] = useState(perPageParam ? parseInt(perPageParam) : 10);
  const [filters, setFilters] = useState<Record<string, any>>({});
  // Combine name and email filters into a single search string if they exist
  const combinedSearch = [
    filters.search,
    filters.name ? `name:${filters.name}` : null,
    filters.email ? `email:${filters.email}` : null
  ].filter(Boolean).join(' ');

  const { data: users, isLoading, isError, refetch } = useUsers({
    search: combinedSearch,
    page: currentPage,
    perPage: perPage,
  });
  const deleteUserMutation = useDeleteUser();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };


  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUserMutation.mutateAsync(id);
      refetch();
    } catch (error) {
      toast.error(t("ui.users.deleted_error") || "Error deleting user");
      console.error("Error deleting user:", error);
    }
  };

  const columns = useMemo(() => ([
    createTextColumn<User>({
      id: "name",
      header: t("ui.users.columns.name") || "Name",
      accessorKey: "name",
    }),
    createTextColumn<User>({
      id: "email",
      header: t("ui.users.columns.email") || "Email",
      accessorKey: "email",
    }),
    createDateColumn<User>({
      id: "created_at",
      header: t("ui.users.columns.created_at") || "Created At",
      accessorKey: "created_at",
    }),
    createActionsColumn<User>({
      id: "actions",
      header: t("ui.users.columns.actions") || "Actions",
      renderActions: (user) => (
        <>
          <Link href={`/users/${user.id}/edit?page=${currentPage}&perPage=${perPage}`}>
            <Button variant="outline" size="icon" title={t("ui.users.buttons.edit") || "Edit user"}>
              <PencilIcon className="h-4 w-4" />
            </Button>
          </Link>
          <DeleteDialog
            id={user.id}
            onDelete={handleDeleteUser}
            title={t("ui.users.delete.title") || "Delete user"}
            description={t("ui.users.delete.description") || "Are you sure you want to delete this user? This action cannot be undone."}
            trigger={
              <Button variant="outline" size="icon" className="text-destructive hover:text-destructive" title={t("ui.users.buttons.delete") || "Delete user"}>
                <TrashIcon className="h-4 w-4" />
              </Button>
            }
          />
        </>
      ),
    }),
  ] as ColumnDef<User>[]), [t, handleDeleteUser]);



  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

};

  function CreateFloorDialogue(){
    return(
        <Dialog>
            <DialogTitle className="text-3xl font-bold">
                {t('ui.floors.title')}
            </DialogTitle>
            <DialogTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive">
                <PlusIcon className="mr-2 h-4 w-4" />
                {t('ui.floors.buttons.new')}
            </DialogTrigger>
            <DialogContent>
                <FloorForm></FloorForm>
            </DialogContent>
        </Dialog>
    )

  }

  return (
    <FloorLayout title={t('ui.floors.title')} data={data}>
        <div className="p-6">
              <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <CreateFloorDialogue></CreateFloorDialogue>
                  </div>
            </div>
        </div>
    </FloorLayout>
  );
}
