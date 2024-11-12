"use client";

import { toast } from "sonner";
import { useTransition } from "react";
import { Lock, Unlock } from "lucide-react";
import { useRouter } from "next/navigation";

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

export const SuspendUserConfirmation = ({
  userId,
  action,
}: {
  userId: string;
  action: string;
}) => {
  const router = useRouter();
  let [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-green-600 text-black rounded-md p-3 cursor-pointer">
        {action == "lock" ? (
          <Lock className="w-4 h-4" />
        ) : (
          <Unlock className="w-4 h-4" />
        )}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to{" "}
            {action == "lock" ? "suspend" : "remove suspension"}?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground font-medium">
            {action == "lock"
              ? "This user won't be able to use the platform."
              : "The user will be able to resume activities on the platform"}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-8">
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                await fetch(`/api/users/${userId}`, {
                  method: "PATCH",
                })
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.status == 200) {
                      router.refresh();
                      toast.success(`${action == "lock" ? "User Suspended" : "Removed Suspension"}`)
                    }
                  });
              })
            }
          >
            {isPending ? "Processing..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
