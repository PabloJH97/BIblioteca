import { PageProps } from "@inertiajs/core";
import { useTranslations } from "@/hooks/use-translations";
import { BookshelfForm } from "./components/BookshelfForm";
import { BookshelfLayout } from "@/layouts/bookshelves/BookshelfLayout";

interface EditBookshelfProps extends PageProps {
  bookshelf: {
    id: string;
    number: number;
  };
  page?: string;
  perPage?: string;

}

export default function EditBookshelf({ bookshelf, page, perPage}: EditBookshelfProps) {
  const { t } = useTranslations();

  return (
    <BookshelfLayout title={t("ui.bookshelves.edit")}>
      <div className="p-6">
        <div className="max-w-xl">
          <BookshelfForm
            initialData={bookshelf}
            page={page}
            perPage={perPage}
            pageTitle={t("ui.bookshelves.edit")}
          />
        </div>
      </div>
    </BookshelfLayout>
  );
}
