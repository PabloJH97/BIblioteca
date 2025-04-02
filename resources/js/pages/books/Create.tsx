import { PageProps } from "@/types";
import { useTranslations } from "@/hooks/use-translations";
import { BookLayout } from "@/layouts/books/BookLayout";
import { BookForm } from "./components/BookForm";


interface CreateBookProps extends PageProps {
    arrayGenres:any[];
    arrayBookshelves:any[];
    arrayFloors:any[];
  }

export default function CreateBook({arrayGenres, arrayBookshelves, arrayFloors}:CreateBookProps) {
  const { t } = useTranslations();

  return (
    <BookLayout title={t("ui.books.create")}>
      <div className="p-6">
        <div className="max-w-xl">
          <BookForm arrayGenres={arrayGenres} arrayBookshelves={arrayBookshelves} arrayFloors={arrayFloors} pageTitle={t("ui.books.create")} />
        </div>
      </div>
    </BookLayout>
  );
}
