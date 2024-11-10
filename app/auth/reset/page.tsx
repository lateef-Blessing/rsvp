import { ResetForm } from "@/components/auth/reset-form";
import { Breadcrumb } from "@/components/root/breadcrumb";

const ResetPage = () => {
  return (
    <>
      <Breadcrumb pageName="Reset password" />
      <ResetForm />
    </>
  );
};

export default ResetPage;
