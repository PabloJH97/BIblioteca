import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableSkeleton } from "@/components/stack-table/TableSkeleton";
import { UserLayout } from "@/layouts/users/UserLayout";
import { User, useDeleteUser, useUsers } from "@/hooks/users/useUsers";
import { Check, PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { useState, useMemo } from "react";
import { Link, usePage } from "@inertiajs/react";
import { useTranslations } from "@/hooks/use-translations";
import { Table } from "@/components/stack-table/Table";
import { createTextColumn, createDateColumn, createActionsColumn } from "@/components/stack-table/columnsTable";
import { DeleteDialog } from "@/components/stack-table/DeleteDialog";
import { FiltersTable, FilterConfig } from "@/components/stack-table/FiltersTable";
import { toast } from "sonner";
import { router } from '@inertiajs/react';
import { ColumnDef, Row } from "@tanstack/react-table";
import { ReservationLayout } from "@/layouts/reservations/ReservationLayout";
import { Reservation, useDeleteReservation, useReservations } from "@/hooks/reservations/useReservations";
import { isEmpty } from "lodash";


export default function ReservationsIndex() {
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
    filters.active ? filters.active : 'null',
  ];

  const { data: reservations, isLoading, isError, refetch } = useReservations({
    search: combinedSearch,
    page: currentPage,
    perPage: perPage,
  });
  const deleteReservationMutation = useDeleteReservation();
  const [filterState, setFilterState]=useState(false);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };
  const handleFilterChange = (newFilters: Record<string, any>) => {
    const filtersChanged = newFilters!==filters;

    if (filtersChanged) {
        setCurrentPage(1);
    }
    isEmpty(filters) ? setFilterState(false) : setFilterState(true)
    setFilters(newFilters);
    };

  function handleReturnReservation(reservation: string[]){
    const formData=new FormData();
    formData.append('returned_date', reservation[1]);
    formData.append('_method', 'PUT');
    router.post(`/reservations/${reservation[0]}`, formData);
    refetch();

  }

  const handleDeleteReservation = async (id: string) => {
    try {
      await deleteReservationMutation.mutateAsync(id);
      refetch();
    } catch (error) {
      toast.error(t("ui.reservations.deleted_error") || "Error deleting reservation");
      console.error("Error deleting reservation:", error);
    }
  };



  const columns = useMemo(() => ([
    createTextColumn<Reservation>({
      id: "book",
      header: t("ui.reservations.columns.book") || "Book",
      accessorKey: "book",
    }),
    createTextColumn<Reservation>({
        id: "user",
        header: t("ui.reservations.columns.user") || "User",
        accessorKey: "user",
      }),
      createTextColumn<Reservation>({
        id: "active",
        header: t("ui.reservations.columns.active.title") || "Active",
        accessorKey: "active",
        format:(value)=>{
            return t(`ui.reservations.filters.active.${value}`)
        }
      }),
    createActionsColumn<Reservation>({
      id: "actions",
      header: t("ui.reservations.columns.actions") || "Actions",
      renderActions: (reservation) => (
        <>
          <Button variant="outline" size="icon" title={t("ui.reservations.buttons.return") || "Return reservation"} onClick={()=>{handleReturnReservation([reservation.id, 'true'])}}>
            <Check className="h-4 w-4" />
          </Button>
          <Link href={`/reservations/${reservation.id}/edit?page=${currentPage}&perPage=${perPage}`}>
            <Button variant="outline" size="icon" title={t("ui.reservations.buttons.edit") || "Edit reservation"}>
              <PencilIcon className="h-4 w-4" />
            </Button>
          </Link>
          <DeleteDialog
            id={reservation.id}
            onDelete={handleDeleteReservation}
            title={t("ui.reservations.delete.title") || "Delete reservation"}
            description={t("ui.reservations.delete.description") || "Are you sure you want to delete this reservation? This action cannot be undone."}
            trigger={
              <Button variant="outline" size="icon" className="text-destructive hover:text-destructive" title={t("ui.reservations.buttons.delete") || "Delete reservation"}>
                <TrashIcon className="h-4 w-4" />
              </Button>
            }
          />
        </>
      ),
    }),
  ] as ColumnDef<Reservation>[]), [t, handleDeleteReservation]);

  return (
      <ReservationLayout title={t('ui.reservations.title')}>
          <div className="p-6">
              <div className="space-y-6">
                  <div className="flex items-center justify-between">
                      <h1 className="text-3xl font-bold">{t('ui.reservations.title')}</h1>
                      <Link href="/reservations/create">
                          <Button>
                              <PlusIcon className="mr-2 h-4 w-4" />
                              {t('ui.reservations.buttons.new')}
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
                                      label: t('ui.reservations.filters.book') || 'Libro',
                                      type: 'text',
                                      placeholder: t('ui.reservations.placeholders.book') || 'Libro...',
                                  },
                                  {
                                    id: 'user',
                                    label: t('ui.reservations.filters.user') || 'Usuario',
                                    type: 'text',
                                    placeholder: t('ui.reservations.placeholders.user') || 'Usuario...',
                                },
                                {
                                    id: 'active',
                                    label: t('ui.reservations.filters.active.title') || 'Activo',
                                    type: 'select',
                                    options: [{value:'true', label:t('ui.reservations.filters.active.active')}, {value:'false', label: t('ui.reservations.filters.active.inactive')}],
                                    placeholder: t('ui.reservations.placeholders.active.title') || 'Activo...',
                                },


                              ] as FilterConfig[]
                          }
                          onFilterChange={handleFilterChange}
                          initialValues={filters}
                      />
                  </div>
                  {filterState && reservations?.meta.total!=undefined && <h2>{t('ui.common.filters.results')+reservations?.meta.total}</h2>}
                  <div className="w-full overflow-hidden">
                      {isLoading ? (
                          <TableSkeleton columns={4} rows={10} />
                      ) : isError ? (
                          <div className="p-4 text-center">
                              <div className="mb-4 text-red-500">{t('ui.reservations.error_loading')}</div>
                              <Button onClick={() => refetch()} variant="outline">
                                  {t('ui.reservations.buttons.retry')}
                              </Button>
                          </div>
                      ) : (
                          <div>
                              <Table
                                  data={
                                      reservations ?? {
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
                                  noResultsMessage={t('ui.reservations.no_results') || 'No reservations found'}
                              />
                          </div>
                      )}
                  </div>
              </div>
          </div>
      </ReservationLayout>
  );
}
