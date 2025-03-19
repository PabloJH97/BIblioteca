import { UserForm } from "@/pages/users/components/UserForm";
import { UserLayout } from "@/layouts/users/UserLayout";
import { PageProps } from "@/types";
import { useTranslations } from "@/hooks/use-translations";

interface CreateUserProps extends PageProps {
    roles?: string[];
    arrayPermissions?: string[];

  }

export default function CreateUser({arrayPermissions}:CreateUserProps) {
  const { t } = useTranslations();

  return (
    <UserLayout title={t("ui.users.create")}>
      <div className="p-6">
        <div className="max-w-xl">
          <UserForm arrayPermissions={arrayPermissions} />
        </div>
      </div>
    </UserLayout>
  );
}
