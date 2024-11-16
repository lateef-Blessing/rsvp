import { RegisterForm } from "@/components/auth/register-form";
import { Breadcrumb } from "@/components/root/breadcrumb";

const RegisterPage = () => {
  return (
    <>
      <Breadcrumb pageName="Sign Up Page" />
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
