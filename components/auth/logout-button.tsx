"use client";

import { logout } from "@/actions/logout";

interface Props {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: Props) => {

  const onClick = () => {
    logout().then(() => {
      location.assign("/auth/login");
    });
  };

  return (
    <span onClick={onClick} className="cursor-pointer flex items-center">
      {children}
    </span>
  );
}
