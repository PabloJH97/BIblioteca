import { PageProps } from "@/types";
import { useTranslations } from "@/hooks/use-translations";
import { ZoneLayout } from "@/layouts/zones/ZoneLayout";
import { ZoneForm } from "./components/ZoneForm";


interface CreateZoneProps extends PageProps {
    genreArray: any[];
    floorArray: any[];
  }

export default function CreateZone({genreArray, floorArray}:CreateZoneProps) {
  const { t } = useTranslations();

  return (
    <ZoneLayout title={t("ui.zones.create")}>
      <div className="p-6">
        <div className="max-w-xl">
          <ZoneForm genreArray={genreArray} floorArray={floorArray} pageTitle={t("ui.zones.create")} />
        </div>
      </div>
    </ZoneLayout>
  );
}
