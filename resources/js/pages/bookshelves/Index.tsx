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
import { BookshelfLayout } from "@/layouts/bookshelves/BookshelfLayout";
import { Bookshelf, useDeleteBookshelf, useBookshelves } from "@/hooks/bookshelves/useBookshelves";
import { isEmpty } from "lodash";


export default function bookshelfsIndex() {
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
    filters.number ? filters.number : 'null',
    filters.capacity ? filters.capacity : 'null',
    filters.zone ? filters.zone : 'null',
  ];

  const { data: bookshelves, isLoading, isError, refetch } = useBookshelves({
    search: combinedSearch,
    page: currentPage,
    perPage: perPage,
  });
  const deleteBookshelfMutation = useDeleteBookshelf();
  const [filterState, setFilterState]=useState(false);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleDeleteBookshelf = async (id: string) => {
    try {
      await deleteBookshelfMutation.mutateAsync(id);
      refetch();
    } catch (error) {
      toast.error(t("ui.bookshelvess.deleted_error") || "Error deleting bookshelf");
      console.error("Error deleting bookshelf:", error);
    }
  };
  const handleFilterChange = (newFilters: Record<string, any>) => {
    const filtersChanged = newFilters!==filters;

    if (filtersChanged) {
        setCurrentPage(1);
    }
    isEmpty(filters) ? setFilterState(false) : setFilterState(true)
    setFilters(newFilters);
    };

  const columns = useMemo(() => ([
    createTextColumn<Bookshelf>({
      id: "number",
      header: t("ui.bookshelves.columns.number") || "Number",
      accessorKey: "number",
    }),
    createTextColumn<Bookshelf>({
        id: "capacity",
        header: t("ui.bookshelves.columns.capacity") || "Capacity",
        accessorKey: "capacity",
      }),
      createTextColumn<Bookshelf>({
        id: "zone",
        header: t("ui.bookshelves.columns.zone") || "Zone",
        accessorKey: "zone",
      }),
    createDateColumn<Bookshelf>({
      id: "created_at",
      header: t("ui.bookshelves.columns.created_at") || "Created At",
      accessorKey: "created_at",
    }),
    createActionsColumn<Bookshelf>({
      id: "actions",
      header: t("ui.bookshelves.columns.actions") || "Actions",
      renderActions: (bookshelf) => (
        <>
          <Link href={`/bookshelves/${bookshelf.id}/edit?page=${currentPage}&perPage=${perPage}`}>
            <Button variant="outline" size="icon" title={t("ui.bookshelves.buttons.edit") || "Edit bookshelf"}>
              <PencilIcon className="h-4 w-4" />
            </Button>
          </Link>
          <DeleteDialog
            id={bookshelf.id}
            onDelete={handleDeleteBookshelf}
            title={t("ui.bookshelves.delete.title") || "Delete bookshelf"}
            description={t("ui.bookshelves.delete.description") || "Are you sure you want to delete this bookshelf? This action cannot be undone."}
            trigger={
              <Button variant="outline" size="icon" className="text-destructive hover:text-destructive" title={t("ui.bookshelves.buttons.delete") || "Delete bookshelf"}>
                <TrashIcon className="h-4 w-4" />
              </Button>
            }
          />
        </>
      ),
    }),
  ] as ColumnDef<Bookshelf>[]), [t, handleDeleteBookshelf]);

  return (
      <BookshelfLayout title={t('ui.bookshelves.title')}>
          <div className="p-6">
              <div className="space-y-6">
                  <div className="flex items-center justify-between">
                      <h1 className="text-3xl font-bold">{t('ui.bookshelves.title')}</h1>
                      <Link href="/bookshelves/create">
                          <Button>
                              <PlusIcon className="mr-2 h-4 w-4" />
                              {t('ui.bookshelves.buttons.new')}
                          </Button>
                      </Link>
                  </div>
                  <div></div>

                  <div className="space-y-4">
                      <FiltersTable
                          filters={
                              [
                                  {
                                      id: 'number',
                                      label: t('ui.bookshelves.filters.number') || 'Número',
                                      type: 'number',
                                      placeholder: t('ui.bookshelves.placeholders.number') || 'Número...',
                                  },
                                  {
                                    id: 'capacity',
                                    label: t('ui.bookshelves.filters.capacity') || 'Capacidad',
                                    type: 'number',
                                    placeholder: t('ui.bookshelves.placeholders.capacity') || 'Capacidad...',
                                },
                                {
                                    id: 'zone',
                                    label: t('ui.bookshelves.filters.zone') || 'Zona',
                                    type: 'text',
                                    placeholder: t('ui.bookshelves.placeholders.zone') || 'Zona...',
                                },
                              ] as FilterConfig[]
                          }
                          onFilterChange={handleFilterChange}
                          initialValues={filters}
                      />
                  </div>
                  {filterState && bookshelves?.meta.total!=undefined && <h2>{t('ui.common.filters.results')+bookshelves?.meta.total}</h2>}
                  <div className="w-full overflow-hidden">
                      {isLoading ? (
                          <TableSkeleton columns={4} rows={10} />
                      ) : isError ? (
                          <div className="p-4 text-center">
                              <div className="mb-4 text-red-500">{t('ui.bookshelves.error_loading')}</div>
                              <Button onClick={() => refetch()} variant="outline">
                                  {t('ui.bookshelves.buttons.retry')}
                              </Button>
                          </div>
                      ) : (
                          <div>
                              <Table
                                  data={
                                      bookshelves ?? {
                                          data: [],
                                          meta: {
                                              current_page: 1,
                                              from: 0,
                                              last_page: 1,
                                              per_page: perPage,
                                              to: 0,
                                              total: 0,
                                          },
                                      }
                                  }
                                  columns={columns}
                                  onPageChange={handlePageChange}
                                  onPerPageChange={handlePerPageChange}
                                  perPageOptions={[10, 25, 50, 100]}
                                  noResultsMessage={t('ui.bookshelves.no_results') || 'No bookshelves found'}
                              />
                          </div>
                      )}
                  </div>
              </div>
          </div>
      </BookshelfLayout>
  );
}
