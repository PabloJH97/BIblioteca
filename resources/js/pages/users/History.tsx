import { UserForm } from "@/pages/users/components/UserForm";
import { UserLayout } from "@/layouts/users/UserLayout";
import { PageProps } from "@/types";
import { useTranslations } from "@/hooks/use-translations";
import { UserHistory } from "./components/UserHistory";

interface HistoryUserProps extends PageProps {
    history?:any[];

  }

export default function HistoryUser({history}:HistoryUserProps) {
  const { t } = useTranslations();

  return (
    <UserLayout title={t("ui.users.history.title")}>
      <div className="p-6">
        <div className="max-w-xl items-center ">
          <UserHistory history={history}></UserHistory>
        </div>
      </div>
    </UserLayout>
  );
}
