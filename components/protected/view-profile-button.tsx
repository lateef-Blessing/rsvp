"use client";

import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";

export const ViewProfileButton = ({ userId }: { userId: string }) => {

  return (
    <Button onClick={() => window.location.assign(`/users/${userId}`)}>
      <Eye className="w-4 h-4" />
    </Button>
  );
};
