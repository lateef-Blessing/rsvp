"use client";

import Link from "next/link";

import { useCurrentUser } from "@/hooks/use-current-user";
import { UserInfo } from "@/components/protected/user-info";
import { ContentLayout } from "@/components/protected/content-layout";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Admin = () => {
  const user = useCurrentUser();
  if (!user) {
    return null;
  }

  return (
    <ContentLayout title="Profile">
      <div className="w-full mx-auto rounded-lg shadow-md p-6">
        <div className="flex items-center">
          <img
            src="/assets/images/avatar.jpg"
            alt={user.name!}
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h1 className="text-xl font-semibold">{user.name}</h1>
            <p className="text-gray-500">
              Earnings: {formatPrice(user.balance.toString())}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <Button className="w-full bg-bgPrimary text-white hover:bg-bgPrimary/80">
            <Link href="/account/settings">Edit Profile</Link>
          </Button>
        </div>
        <div className="mt-2">
          <Button className="w-full bg-white text-black hover:bg-white/80">
            <Link href="/account/withdraw">Withdraw</Link>
          </Button>
        </div>
      </div>

      <UserInfo user={user} />
    </ContentLayout>
  );
};

export default Admin;
