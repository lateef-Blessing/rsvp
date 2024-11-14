"use client";

import { useRouter } from "next/navigation";

export const BackButton = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return <span onClick={router.back} className="cursor-pointer bg-primary text-primary">{children}</span>;
};
