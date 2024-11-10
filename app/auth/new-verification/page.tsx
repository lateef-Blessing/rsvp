import { NewVerificationForm } from "@/components/auth/new-verification-form";
import { Breadcrumb } from "@/components/root/breadcrumb";

const NewVerificationPage = () => {
  return (
    <>
      <Breadcrumb pageName="Email verification" />
      <NewVerificationForm />
    </>
  );
};

export default NewVerificationPage;
