import { PageProps } from "@inertiajs/core";
import { useTranslations } from "@/hooks/use-translations";
import { BookshelfForm } from "./components/BookshelfForm";
import { BookshelfLayout } from "@/layouts/bookshelves/BookshelfLayout";

interface EditBookshelfProps extends PageProps {
  bookshelf: {
    id: string;
    number: number;
    capacity: number;
    zone_id: string;
  };
  page?: string;
  perPage?: string;
  arrayZones: any[];
  arrayFloors: any[];
  selectedFloor?: string;
}

export default function EditBookshelf({ bookshelf, page, perPage, arrayZones, arrayFloors, selectedFloor}: EditBookshelfProps) {
  const { t } = useTranslations();

  return (
    <BookshelfLayout title={t("ui.bookshelves.edit")}>
      <div className="p-6">
        <div className="max-w-xl">
          <BookshelfForm
            initialData={bookshelf}
            arrayZones={arrayZones}
            arrayFloors={arrayFloors}
            selectedFloor={selectedFloor}
            page={page}
            perPage={perPage}
            pageTitle={t("ui.bookshelves.edit")}
          />
        </div>
      </div>
    </BookshelfLayout>
  );
}
