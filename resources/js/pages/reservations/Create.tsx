import { PageProps } from "@/types";
import { useTranslations } from "@/hooks/use-translations";
import { ReservationForm } from "./components/ReservationForm";
import { ReservationLayout } from "@/layouts/reservations/ReservationLayout";

interface CreateReservationProps extends PageProps {


  }

export default function CreateReservation({}:CreateReservationProps) {
  const { t } = useTranslations();

    const paramsString = window.location.search;
    const searchParams = new URLSearchParams(paramsString);
    const bookISBN = searchParams.toString().split('=')[1];
  return (
    <ReservationLayout title={t("ui.reservations.create")}>
      <div className="p-6">
        <div className="max-w-xl">
          <ReservationForm pageTitle={t("ui.reservations.create")} bookISBN={bookISBN}/>
        </div>
      </div>
    </ReservationLayout>
  );
}
