import { PageProps } from "@/types";
import { useTranslations } from "@/hooks/use-translations";
import { LoanForm } from "./components/LoanForm";
import { LoanLayout } from "@/layouts/loans/LoanLayout";

interface CreateLoanProps extends PageProps {


  }

export default function CreateLoan({}:CreateLoanProps) {
  const { t } = useTranslations();

    const paramsString = window.location.search;
    const searchParams = new URLSearchParams(paramsString);
    const bookISBN = searchParams.get('ISBN');
  return (
    <LoanLayout title={t("ui.loans.create")}>
      <div className="p-6">
        <div className="max-w-xl">
          <LoanForm pageTitle={t("ui.loans.create")} bookISBN={bookISBN}/>
        </div>
      </div>
    </LoanLayout>
  );
}
