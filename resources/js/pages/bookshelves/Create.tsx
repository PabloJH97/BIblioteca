import { PageProps } from "@/types";
import { useTranslations } from "@/hooks/use-translations";
import { BookshelfLayout } from "@/layouts/bookshelves/BookshelfLayout";
import { BookshelfForm } from "./components/BookshelfForm";


interface CreateBookshelfProps extends PageProps {
    arrayZones:any[]
    arrayFloors:any[]
    selectedFloor:string;

  }

export default function CreateBookshelf({arrayZones, arrayFloors}:CreateBookshelfProps) {
  const { t } = useTranslations();

  return (
    <BookshelfLayout title={t("ui.bookshelves.create")}>
      <div className="p-6">
        <div className="max-w-xl">
          <BookshelfForm arrayZones={arrayZones} arrayFloors={arrayFloors} pageTitle={t("ui.bookshelves.create")} />
        </div>
      </div>
    </BookshelfLayout>
  );
}
