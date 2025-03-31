import { PageProps } from "@/types";
import { useTranslations } from "@/hooks/use-translations";
import { FloorForm } from "./components/FloorForm";
import { FloorLayout } from "@/layouts/floors/FloorLayout";

interface CreateFloorProps extends PageProps {


  }

export default function CreateFloor({}:CreateFloorProps) {
  const { t } = useTranslations();

  return (
    <FloorLayout title={t("ui.floors.create")}>
      <div className="p-6">
        <div className="max-w-xl">
          <FloorForm pageTitle={t("ui.floors.create")} />
        </div>
      </div>
    </FloorLayout>
  );
}
