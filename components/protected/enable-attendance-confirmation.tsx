"use client";

import { useTransition } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { enableEventAttendance } from "@/actions/event";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Button } from "@/components/ui/button";

export const EnableAttendanceConfirmation = ({
  eventId,
}: {
  eventId: string;
}) => {
  const pathname = usePathname();
  const user = useCurrentUser();
  let [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-max" variant="default">Enable Invite Link</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to enable invite link?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground font-medium">
            This will enable the event invite link and users will be
            able to join the event again by following the link.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-8">
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                await enableEventAttendance({
                  eventId,
                  userId: user?.id!,
                  path: pathname,
                });
              })
            }
          >
            {isPending ? "Submitting..." : "continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
