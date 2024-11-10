import { Order, UserRole } from "@prisma/client";
import { redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ContentLayout } from "@/components/protected/content-layout";
import { currentUser } from "@/lib/auth";
import { formatDateTime, formatPrice } from "@/lib/utils";
import { getUsers } from "@/actions/user";
import { SearchParamProps } from "@/types";
import { getAllEventsAdmin } from "@/actions/event";
import { getOrders } from "@/actions/order";
import { EventSearch } from "@/components/protected/event-search";

async function fetchTransactionSummary() {
  const response = await fetch("https://api.paystack.co/transaction", {
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch transactions`);
  }

  const data = await response.json();
  const transactions = data.data;

  let totalSum = 0;
  let totalRefunded = 0;

  transactions.forEach((transaction: any) => {
    if (transaction.status === "success") {
      totalSum += transaction.amount;
    } else if (transaction.status === "refunded") {
      totalRefunded += transaction.amount;
    }
  });

  return {
    totalSum: totalSum / 100,
    totalRefunded: totalRefunded / 100,
  };
}

export default async function DashboardPage({
  searchParams,
}: SearchParamProps) {
  const user = await currentUser();
  const users = await getUsers({ searchString: "" });
  const searchText = (searchParams?.query as string) || "";
  const orders = await getOrders({ searchString: searchText });
  const events = await getAllEventsAdmin();
  const { totalSum, totalRefunded } = await fetchTransactionSummary();

  if (!user) {
    return redirect("/auth/login");
  }

  if (user.role !== UserRole.ADMIN) {
    return redirect("/organized");
  }

  return (
    <ContentLayout title="Dashboard">
      <h3 className="text-2xl font-semibold tracking-tight">
        Hi {user.name}
        {" 👋"}
      </h3>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 mt-6">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-2">
              <CardDescription>Total Transactions</CardDescription>
              <CardTitle className="text-4xl">
                {formatPrice(totalSum.toString())}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                All time payment for events
              </div>
            </CardContent>
            <CardFooter>
              <Progress value={25} aria-label="25% increase" />
            </CardFooter>
          </Card>
          <Card x-chunk="dashboard-05-chunk-2">
            <CardHeader className="pb-2">
              <CardDescription>Total Refunded</CardDescription>
              <CardTitle className="text-4xl">
                {formatPrice(totalRefunded.toString())}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                All time refunds to members
              </div>
            </CardContent>
            <CardFooter>
              <Progress value={50} aria-label="50% increase" />
            </CardFooter>
          </Card>
          <Card x-chunk="dashboard-05-chunk-3">
            <CardHeader className="pb-2">
              <CardDescription>Total Users</CardDescription>
              <CardTitle className="text-4xl">{users?.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                Total active users
              </div>
            </CardContent>
            <CardFooter>
              <Progress value={75} aria-label="75% increase" />
            </CardFooter>
          </Card>
          <Card x-chunk="dashboard-05-chunk-4">
            <CardHeader className="pb-2">
              <CardDescription>Total Events</CardDescription>
              <CardTitle className="text-4xl">{events?.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                Total active events
              </div>
            </CardContent>
            <CardFooter>
              <Progress value={100} aria-label="100% increase" />
            </CardFooter>
          </Card>
        </div>

        <section className="mt-8">
          <EventSearch placeholder="Search event title..." />
        </section>
        <section className="overflow-x-auto p-1">
          <table className="w-full border-collapse border-t">
            <thead>
              <tr className="font-medium tracking-tight border-b text-muted-foreground">
                <th className="min-w-[100px] py-3 text-left">Transaction ID</th>
                <th className="min-w-[100px] py-3 text-left">Event Title</th>
                <th className="min-w-[100px] py-3 text-left">Price</th>
                <th className="min-w-[100px] py-3 text-left">
                  Transaction Type
                </th>
                <th className="min-w-[100px] py-3 text-left">Date Created</th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.length === 0 ? (
                <tr className="border-b">
                  <td
                    colSpan={5}
                    className="py-4 text-center text-muted-foreground"
                  >
                    No transactions found.
                  </td>
                </tr>
              ) : (
                <>
                  {orders &&
                    orders.map((row: Order) => (
                      <tr
                        key={row.id}
                        className="font-normal tracking-tight leading-relaxed lg:font-medium border-b"
                        style={{ boxSizing: "border-box" }}
                      >
                        <td className="min-w-[100px] py-4 text-primary">
                          {row.id}
                        </td>
                        <td className="min-w-[100px] py-4">{row.eventTitle}</td>
                        <td className="min-w-[100px] py-4">
                          {formatPrice(row.price.toString())}
                        </td>
                        <td className="min-w-[100px] py-4">
                          {row.order_type + "event".toUpperCase()}
                        </td>
                        <td className="min-w-[100px] py-4">
                          {formatDateTime(row.createdAt!).dateTime}
                        </td>
                      </tr>
                    ))}
                </>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </ContentLayout>
  );
}
