import { PageProps } from "@inertiajs/core";
import { useTranslations } from "@/hooks/use-translations";
import { FloorForm } from "./components/FloorForm";
import { FloorLayout } from "@/layouts/floors/FloorLayout";

interface EditFloorProps extends PageProps {
  floor: {
    id: string;
    name: string;
  };
  page?: string;
  perPage?: string;

}

export default function EditFloor({ floor, page, perPage}: EditFloorProps) {
  const { t } = useTranslations();

  return (
    <FloorLayout title={t("ui.floors.edit")}>
      <div className="p-6">
        <div className="max-w-xl">
          <FloorForm
            initialData={floor}
            page={page}
            perPage={perPage}
            pageTitle={t("ui.floors.edit")}
          />
        </div>
      </div>
    </FloorLayout>
  );
}
