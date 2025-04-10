import { PageProps } from "@inertiajs/core";
import { useTranslations } from "@/hooks/use-translations";
import { LoanForm } from "./components/LoanForm";
import { LoanLayout } from "@/layouts/loans/LoanLayout";

interface EditLoanProps extends PageProps {
  loan: {
    id: string;
    ISBN: string;
    email: string;
  };
  page?: string;
  perPage?: string;

}

export default function EditLoan({ loan, page, perPage}: EditLoanProps) {
  const { t } = useTranslations();

  return (
    <LoanLayout title={t("ui.loans.edit")}>
      <div className="p-6">
        <div className="max-w-xl">
          <LoanForm
            initialData={loan}
            page={page}
            perPage={perPage}
            pageTitle={t("ui.loans.edit")}
          />
        </div>
      </div>
    </LoanLayout>
  );
}
