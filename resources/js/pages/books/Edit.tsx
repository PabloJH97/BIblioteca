import { PageProps } from "@inertiajs/core";
import { useTranslations } from "@/hooks/use-translations";
import { BookForm } from "./components/BookForm";
import { BookLayout } from "@/layouts/books/BookLayout";

interface EditBookProps extends PageProps {
  book: {
    id: string;
    title: string;
    author: string;
    pages: number;
    editorial: string;
    genre: string;
    bookshelf_id: string;
    image: File;
  };
  page?: string;
  perPage?: string;
  arrayGenres: any[];
  arrayBookshelves: any[];
  arrayFloors: any[];
}

export default function EditBook({ book, page, perPage, arrayGenres, arrayBookshelves, arrayFloors}: EditBookProps) {
  const { t } = useTranslations();

  return (
    <BookLayout title={t("ui.books.edit")}>
      <div className="p-6">
        <div className="max-w-xl">
          <BookForm
            initialData={book}
            arrayGenres={arrayGenres}
            arrayBookshelves={arrayBookshelves}
            arrayFloors={arrayFloors}
            page={page}
            perPage={perPage}
            pageTitle={t("ui.books.edit")}
          />
        </div>
      </div>
    </BookLayout>
  );
}
