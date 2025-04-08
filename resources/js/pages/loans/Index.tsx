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
import { LoanLayout } from "@/layouts/loans/LoanLayout";
import { Loan, useDeleteLoan, useLoans } from "@/hooks/loans/useLoans";


export default function LoansIndex() {
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
    filters.book ? filters.book : 'null',
    filters.user ? filters.user : 'null',
    filters.borrowed ? filters.borrowed : 'null',
    filters.is_overdue ? filters.is_overdue : 'null',
    filters.created_at ? filters.created_at : 'null',
    filters.return_date ? filters.return_date : 'null',
  ];

  const { data: loans, isLoading, isError, refetch } = useLoans({
    search: combinedSearch,
    page: currentPage,
    perPage: perPage,
  });
  const deleteLoanMutation = useDeleteLoan();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleDeleteLoan = async (id: string) => {
    try {
      await deleteLoanMutation.mutateAsync(id);
      refetch();
    } catch (error) {
      toast.error(t("ui.loans.deleted_error") || "Error deleting loan");
      console.error("Error deleting loan:", error);
    }
  };

  const columns = useMemo(() => ([
    createTextColumn<Loan>({
      id: "book",
      header: t("ui.loans.columns.book") || "Book",
      accessorKey: "book",
    }),
    createTextColumn<Loan>({
        id: "user",
        header: t("ui.loans.columns.user") || "User",
        accessorKey: "user",
      }),
      createTextColumn<Loan>({
        id: "borrowed",
        header: t("ui.loans.columns.borrowed") || "Borrowed",
        accessorKey: "borrowed",
      }),
      createTextColumn<Loan>({
        id: "is_overdue",
        header: t("ui.loans.columns.is_overdue") || "Is overdue",
        accessorKey: "is_overdue",
      }),
    createDateColumn<Loan>({
      id: "created_at",
      header: t("ui.loans.columns.created_at") || "Created At",
      accessorKey: "created_at",
    }),
    createTextColumn<Loan>({
        id: "return_date",
        header: t("ui.loans.columns.return_date") || "Return date",
        accessorKey: "return_date",
      }),
    createActionsColumn<Loan>({
      id: "actions",
      header: t("ui.loans.columns.actions") || "Actions",
      renderActions: (loan) => (
        <>
          <Link href={`/loans/${loan.id}/edit?page=${currentPage}&perPage=${perPage}`}>
            <Button variant="outline" size="icon" title={t("ui.loans.buttons.edit") || "Edit loan"}>
              <PencilIcon className="h-4 w-4" />
            </Button>
          </Link>
          <DeleteDialog
            id={loan.id}
            onDelete={handleDeleteLoan}
            title={t("ui.loans.delete.title") || "Delete loan"}
            description={t("ui.loans.delete.description") || "Are you sure you want to delete this loan? This action cannot be undone."}
            trigger={
              <Button variant="outline" size="icon" className="text-destructive hover:text-destructive" title={t("ui.loans.buttons.delete") || "Delete loan"}>
                <TrashIcon className="h-4 w-4" />
              </Button>
            }
          />
        </>
      ),
    }),
  ] as ColumnDef<Loan>[]), [t, handleDeleteLoan]);

  return (
      <LoanLayout title={t('ui.loans.title')}>
          <div className="p-6">
              <div className="space-y-6">
                  <div className="flex items-center justify-between">
                      <h1 className="text-3xl font-bold">{t('ui.loans.title')}</h1>
                      <Link href="/loans/create">
                          <Button>
                              <PlusIcon className="mr-2 h-4 w-4" />
                              {t('ui.loans.buttons.new')}
                          </Button>
                      </Link>
                  </div>
                  <div></div>

                  <div className="space-y-4">
                      <FiltersTable
                          filters={
                              [
                                  {
                                      id: 'book',
                                      label: t('ui.loans.filters.book') || 'Libro',
                                      type: 'text',
                                      placeholder: t('ui.loans.placeholders.book') || 'Libro...',
                                  },
                                  {
                                    id: 'user',
                                    label: t('ui.loans.filters.user') || 'Usuario',
                                    type: 'text',
                                    placeholder: t('ui.loans.placeholders.user') || 'Usuario...',
                                },
                                {
                                    id: 'borrowed',
                                    label: t('ui.loans.filters.borrowed') || 'Prestado',
                                    type: 'text',
                                    // defaultValue: 'Devuelto',
                                    // options: [{value:'En préstamo', label:'En préstamo'}, {value:'Devuelto', label: 'Devuelto'}],
                                    placeholder: t('ui.loans.placeholders.borrowed') || 'Prestado...',
                                },
                                {
                                    id: 'is_overdue',
                                    label: t('ui.loans.filters.is_overdue') || 'Va tarde',
                                    type: 'text',
                                    placeholder: t('ui.loans.placeholders.is_overdue') || 'Va tarde...',
                                },
                                {
                                    id: 'created_at',
                                    label: t('ui.loans.filters.created_at') || 'Fecha de creación',
                                    type: 'date',
                                    placeholder: t('ui.loans.placeholders.created_at') || 'Fecha de creación...',
                                },
                                {
                                    id: 'return_date',
                                    label: t('ui.loans.filters.return_date') || 'Fecha de devolucióm',
                                    type: 'date',
                                    placeholder: t('ui.loans.placeholders.return_date') || 'Fecha de devolución...',
                                },


                              ] as FilterConfig[]
                          }
                          onFilterChange={setFilters}
                          initialValues={filters}
                      />
                  </div>

                  <div className="w-full overflow-hidden">
                      {isLoading ? (
                          <TableSkeleton columns={4} rows={10} />
                      ) : isError ? (
                          <div className="p-4 text-center">
                              <div className="mb-4 text-red-500">{t('ui.loans.error_loading')}</div>
                              <Button onClick={() => refetch()} variant="outline">
                                  {t('ui.loans.buttons.retry')}
                              </Button>
                          </div>
                      ) : (
                          <div>
                              <Table
                                  data={
                                      loans ?? {
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
                                  noResultsMessage={t('ui.loans.no_results') || 'No loans found'}
                              />
                          </div>
                      )}
                  </div>
              </div>
          </div>
      </LoanLayout>
  );
}
