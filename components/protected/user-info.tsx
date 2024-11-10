import { ExtendedUser } from "@/next-auth";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface UserInfoProps {
  user?: ExtendedUser;
}

export const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <Card className="w-full shadow-md">
      <CardContent className="space-y-4 mt-12">
        <div className="flex -flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Name</p>
          <p className="truncate text-xs max-w-[200px] p-1 rounded-md">
            {user?.name}
          </p>
        </div>
        <div className="flex -flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Email</p>
          <p className="truncate text-xs max-w-[200px] p-1 rounded-md">
            {user?.email}
          </p>
        </div>
        <div className="flex -flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Role</p>
          <p className="truncate text-xs max-w-[200px] p-1 rounded-md">
            {user?.role}
          </p>
        </div>
        <div className="flex -flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Two Factor Authentication</p>
          <Badge variant={user?.isTwoFactorEnabled ? "outline" : "destructive"}>
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
