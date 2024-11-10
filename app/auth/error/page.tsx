import { ErrorCard } from "@/components/auth/error-card";
import { Breadcrumb } from "@/components/root/breadcrumb";

const AuthErrorPage = () => {
  return (
    <>
      <Breadcrumb pageName="Auth Error" />
      <ErrorCard />
    </>
  );
};

export default AuthErrorPage;
