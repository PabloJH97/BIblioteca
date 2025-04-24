import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableSkeleton } from "@/components/stack-table/TableSkeleton";
import { UserLayout } from "@/layouts/users/UserLayout";
import { User, useDeleteUser, useUsers } from "@/hooks/users/useUsers";
import { Archive, Barcode, PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { useState, useMemo } from "react";
import { Link, usePage } from "@inertiajs/react";
import { useTranslations } from "@/hooks/use-translations";
import { Table } from "@/components/stack-table/Table";
import { createTextColumn, createDateColumn, createActionsColumn } from "@/components/stack-table/columnsTable";
import { DeleteDialog } from "@/components/stack-table/DeleteDialog";
import { FiltersTable, FilterConfig } from "@/components/stack-table/FiltersTable";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { ColumnDef, Row } from "@tanstack/react-table";
import { BookLayout } from "@/layouts/books/BookLayout";
import { Book, useDeleteBook, useBooks } from "@/hooks/books/useBooks";
import { isEmpty } from "lodash";


export default function booksIndex() {
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
    filters.title ? filters.title : 'null',
    filters.author ? filters.author : 'null',
    filters.pages ? filters.pages : 'null',
    filters.editorial ? filters.editorial : 'null',
    filters.ISBN ? filters.ISBN : 'null',
    filters.genre ? filters.genre : 'null',
    filters.bookshelf ? filters.bookshelf : 'null',
  ];

  const { data: books, isLoading, isError, refetch } = useBooks({
    search: combinedSearch,
    page: currentPage,
    perPage: perPage,
  });
  const deleteBookMutation = useDeleteBook();
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

  function handleCreateLoan(ISBN: string){
    router.get(`loans/create`, {ISBN})
  }

  function handleCreateReservation(ISBN: string){
    router.get(`reservations/create`, {ISBN})
  }

  const handleDeleteBook = async (id: string) => {
    try {
      await deleteBookMutation.mutateAsync(id);
      refetch();
    } catch (error) {
      toast.error(t("ui.bookss.deleted_error") || "Error deleting book");
      console.error("Error deleting book:", error);
    }
  };

  function LoanButton(ISBN: string){
    return(
        <Button variant="outline" size="icon" title={t("ui.loans.buttons.edit") || "Edit loan"} onClick={()=>handleCreateLoan(ISBN.ISBN)}>
            <Barcode className="h-4 w-4" />
          </Button>
    )
  }
  function ReservationButton(ISBN: string){
    return(
        <Button variant="outline" size="icon" title={t("ui.loans.buttons.edit") || "Edit loan"} onClick={()=>handleCreateReservation(ISBN.ISBN)}>
            <Archive className="h-4 w-4" />
          </Button>
    )
  }

  const columns = useMemo(() => ([
    createTextColumn<Book>({
      id: "title",
      header: t("ui.books.columns.title") || "Title",
      accessorKey: "title",
    }),
    createTextColumn<Book>({
        id: "author",
        header: t("ui.books.columns.author") || "Author",
        accessorKey: "author",
      }),
      createTextColumn<Book>({
        id: "pages",
        header: t("ui.books.columns.pages") || "Pages",
        accessorKey: "pages",
      }),
      createTextColumn<Book>({
        id: "editorial",
        header: t("ui.books.columns.editorial") || "Editorial",
        accessorKey: "editorial",
      }),
      createTextColumn<Book>({
        id: "ISBN",
        header: t("ui.books.columns.ISBN") || "ISBN",
        accessorKey: "ISBN",
      }),
      createTextColumn<Book>({
        id: "genre",
        header: t("ui.books.columns.genre") || "Genre",
        accessorKey: "genre",
        format: (value) => {
            let returnedValue=t(`ui.genres.names.${value}`);
            let aux;
            let res: string[] = [];
            if (value.includes(',')) {
                aux = value.split(', ');
                aux.map((genre) => {
                    genre = t(`ui.genres.names.${genre}`);
                    res=[...res, genre];
                });
                aux = res.join(', ');
                returnedValue=aux;
            }
            return returnedValue;
        },
      }),
      createTextColumn<Book>({
        id: "bookshelf",
        header: t("ui.books.columns.bookshelf") || "Bookshelf",
        accessorKey: "bookshelf",
      }),
    createDateColumn<Book>({
      id: "created_at",
      header: t("ui.books.columns.created_at") || "Created At",
      accessorKey: "created_at",
    }),
    createActionsColumn<Book>({
      id: "actions",
      header: t("ui.books.columns.actions") || "Actions",
      renderActions: (book) => (
        <>
        {book.hasActive ? <ReservationButton ISBN={book.ISBN}></ReservationButton> : <LoanButton ISBN={book.ISBN}></LoanButton>}

          <Link href={`/books/${book.id}/edit?page=${currentPage}&perPage=${perPage}`}>
            <Button variant="outline" size="icon" title={t("ui.books.buttons.edit") || "Edit book"}>
              <PencilIcon className="h-4 w-4" />
            </Button>
          </Link>
          <DeleteDialog
            id={book.id}
            onDelete={handleDeleteBook}
            title={t("ui.books.delete.title") || "Delete book"}
            description={t("ui.books.delete.description") || "Are you sure you want to delete this book? This action cannot be undone."}
            trigger={
              <Button variant="outline" size="icon" className="text-destructive hover:text-destructive" title={t("ui.books.buttons.delete") || "Delete book"}>
                <TrashIcon className="h-4 w-4" />
              </Button>
            }
          />
        </>
      ),
    }),
  ] as ColumnDef<Book>[]), [t, handleDeleteBook]);

  return (
      <BookLayout title={t('ui.books.title')}>
          <div className="p-6">
              <div className="space-y-6">
                  <div className="flex items-center justify-between">
                      <h1 className="text-3xl font-bold">{t('ui.books.title')}</h1>
                      <Link href="/books/create">
                          <Button>
                              <PlusIcon className="mr-2 h-4 w-4" />
                              {t('ui.books.buttons.new')}
                          </Button>
                      </Link>
                  </div>
                  <div></div>

                  <div className="space-y-4">
                      <FiltersTable
                          filters={
                              [
                                  {
                                      id: 'title',
                                      label: t('ui.books.filters.title') || 'Título',
                                      type: 'text',
                                      placeholder: t('ui.books.placeholders.title') || 'Título...',
                                  },
                                  {
                                    id: 'author',
                                    label: t('ui.books.filters.author') || 'Autor',
                                    type: 'text',
                                    placeholder: t('ui.books.placeholders.author') || 'Autor...',
                                },
                                  {
                                    id: 'pages',
                                    label: t('ui.books.filters.pages') || 'Páginas',
                                    type: 'number',
                                    placeholder: t('ui.books.placeholders.pages') || 'Páginas...',
                                },
                                {
                                    id: 'editorial',
                                    label: t('ui.books.filters.editorial') || 'Editorial',
                                    type: 'text',
                                    placeholder: t('ui.books.placeholders.editorial') || 'Editorial...',
                                },
                                {
                                    id: 'ISBN',
                                    label: t('ui.books.filters.ISBN') || 'ISBN',
                                    type: 'text',
                                    placeholder: t('ui.books.placeholders.ISBN') || 'ISBN...',
                                },
                                {
                                    id: 'genre',
                                    label: t('ui.books.filters.genre') || 'Género',
                                    type: 'text',
                                    placeholder: t('ui.books.placeholders.genre') || 'Género...',
                                },
                                {
                                    id: 'bookshelf',
                                    label: t('ui.books.filters.bookshelf') || 'Estantería',
                                    type: 'number',
                                    placeholder: t('ui.books.placeholders.bookshelf') || 'Estantería...',
                                },
                              ] as FilterConfig[]
                          }
                           onFilterChange={handleFilterChange}
                          initialValues={filters}
                      />
                  </div>
                          {filterState && books?.meta.total!=undefined && <h2>{t('ui.common.filters.results')+books?.meta.total}</h2>}
                  <div className="w-full overflow-hidden">
                      {isLoading ? (
                          <TableSkeleton columns={4} rows={10} />
                      ) : isError ? (
                          <div className="p-4 text-center">
                              <div className="mb-4 text-red-500">{t('ui.books.error_loading')}</div>
                              <Button onClick={() => refetch()} variant="outline">
                                  {t('ui.books.buttons.retry')}
                              </Button>
                          </div>
                      ) : (
                          <div>
                              <Table
                                  data={
                                      books ?? {
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
                                  noResultsMessage={t('ui.books.no_results') || 'No books found'}
                              />
                          </div>
                      )}
                  </div>
              </div>
          </div>
      </BookLayout>
  );
}
