import { LoginForm } from "@/components/auth/login-form";
import { Breadcrumb } from "@/components/root/breadcrumb";

const LoginPage = () => {
  return (
    <>
      <Breadcrumb pageName="Sign In Page" />
      <LoginForm />
    </>
  );
};

export default LoginPage;
