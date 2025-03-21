import { UserForm } from "@/pages/users/components/UserForm";
import { UserLayout } from "@/layouts/users/UserLayout";
import { PageProps } from "@inertiajs/core";
import { useTranslations } from "@/hooks/use-translations";

interface EditUserProps extends PageProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
  page?: string;
  perPage?: string;
  arrayPermissions?: string[];
}

export default function EditUser({ user, page, perPage, arrayPermissions }: EditUserProps) {
  const { t } = useTranslations();

  return (
    <UserLayout title={t("ui.users.edit")}>
      <div className="p-6">
        <div className="max-w-xl">
          <UserForm
            initialData={user}
            page={page}
            perPage={perPage}
            arrayPermissions={arrayPermissions}
            pageTitle={t("ui.users.edit")}
          />
        </div>
      </div>
    </UserLayout>
  );
}
