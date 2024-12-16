import { NewPasswordForm } from "@/components/auth/new-password-form";
import { Breadcrumb } from "@/components/root/breadcrumb";

const NewPasswordPage = () => {
  return (
    <>
      <Breadcrumb pageName="New Password" />
      <NewPasswordForm />
    </>
  );
};

export default NewPasswordPage;
