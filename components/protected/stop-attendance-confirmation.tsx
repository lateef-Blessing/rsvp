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

import { stopEventAttendance } from "@/actions/event";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Button } from "@/components/ui/button";

export const StopAttendanceConfirmation = ({
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
        <Button className="w-max" variant="destructive">Disable Invite Link</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to disable invite link?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground font-medium">
            This will render the event invite link redundant and users won't be
            able to join the event again.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-8">
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                await stopEventAttendance({
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
