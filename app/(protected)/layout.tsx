import { Sidebar } from "@/components/protected/sidebar";
import { Main } from "@/components/protected/main";
import { Footer } from "@/components/protected/footer";
import { currentUser } from "@/lib/auth";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) {
    location.reload();
  }

  if (user?.suspended) {
    return (
      <div className="p-4">
        <h1 className="text-red-400">
          Your account is suspended contact Admin for more info .
        </h1>
        <a href={`mailto:${process.env.NEXT_PUBLIC_PERSONAL_EMAIL}`}>here</a>$
        {process.env.NEXT_PUBLIC_PERSONAL_EMAIL}
      </div>
    );
  } else {
    return (
      <>
        <Sidebar />
        <Main>{children}</Main>
        <Footer />
      </>
    );
  }
}
