import { PageProps } from "@inertiajs/core";
import { useTranslations } from "@/hooks/use-translations";
import { ZoneForm } from "./components/ZoneForm";
import { ZoneLayout } from "@/layouts/zones/ZoneLayout";

interface EditZoneProps extends PageProps {
  zone: {
    id: string;
    genre_id: string;
    floor_id: string;
  };
  page?: string;
  perPage?: string;
  genreArray: any[];
  floorArray: any[];

}

export default function EditZone({ zone, page, perPage, genreArray, floorArray}: EditZoneProps) {
  const { t } = useTranslations();

  return (
    <ZoneLayout title={t("ui.zones.edit")}>
      <div className="p-6">
        <div className="max-w-xl">
          <ZoneForm
            initialData={zone}
            genreArray={genreArray}
            floorArray={floorArray}
            page={page}
            perPage={perPage}
            pageTitle={t("ui.zones.edit")}
          />
        </div>
      </div>
    </ZoneLayout>
  );
}
