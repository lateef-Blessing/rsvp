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

  return (
    <>
      <Sidebar />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
