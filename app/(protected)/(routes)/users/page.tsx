import { User, UserRole } from "@prisma/client";

import { getUsers } from "@/actions/user";
import { SearchParamProps } from "@/types";
import { formatDateTime, formatPrice } from "@/lib/utils";
import { ContentLayout } from "@/components/protected/content-layout";
import { DeleteUserConfirmation } from "@/components/protected/delete-user-confirmation";
import { ViewProfileButton } from "@/components/protected/view-profile-button";
import { EventSearch } from "@/components/protected/event-search";

export default async function UsersPage({ searchParams }: SearchParamProps) {
  const searchText = (searchParams?.query as string) || "";
  const users = await getUsers({ searchString: searchText });

  return (
    <ContentLayout title="Users">
      <section className="mt-8">
        <EventSearch placeholder="Search user name..." />
      </section>

      <section className="overflow-x-auto p-1">
        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="font-medium tracking-tight border-b text-muted-foreground">
              <th className="min-w-[100px] py-3 text-left">Name</th>
              <th className="min-w-[100px] py-3 text-left">Email</th>
              <th className="min-w-[100px] py-3 text-left">Balance</th>
              <th className="min-w-[100px] py-3 text-left">Role</th>
              <th className="min-w-[100px] py-3 text-left">Verified</th>
              <th className="min-w-[100px] py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length === 0 ? (
              <tr className="border-b">
                <td
                  colSpan={5}
                  className="py-4 text-center text-muted-foreground"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              <>
                {users &&
                  users.map((row: User) => (
                    <tr
                      key={row.id}
                      className="font-normal tracking-tight leading-relaxed lg:font-medium border-b"
                      style={{ boxSizing: "border-box" }}
                    >
                      <td className="min-w-[100px] py-4 text-primary">
                        {row.name}
                      </td>
                      <td className="min-w-[100px] py-4">{row.email}</td>
                      <td className="min-w-[100px] py-4">
                        {formatPrice(row.balance.toString())}
                      </td>
                      <td className="min-w-[100px] py-4">
                        {row.role == UserRole.ADMIN ? "Admin" : "User"}
                      </td>
                      <td className="min-w-[100px] py-4">
                        {formatDateTime(row.emailVerified!).dateTime}
                      </td>
                      <td className="min-w-[100px] py-4 flex items-center justify-end gap-2">
                        <ViewProfileButton userId={row.id} />
                        {row.role !== UserRole.ADMIN && (
                          <DeleteUserConfirmation userId={row.id} />
                        )}
                      </td>
                    </tr>
                  ))}
              </>
            )}
          </tbody>
        </table>
      </section>
    </ContentLayout>
  );
}
