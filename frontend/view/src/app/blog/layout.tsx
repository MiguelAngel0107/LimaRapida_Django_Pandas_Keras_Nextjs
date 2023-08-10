"use client";
import { useAppSelector } from "@/redux/hooks";

function Layout({
  children,
  notAuthenticated,
}: {
  children: React.ReactNode;
  notAuthenticated: React.ReactNode;
}) {
  const isAuthenticated = useAppSelector((state) => state.Auth.isAuthenticated);
  if (isAuthenticated == true) {
    return children;
  } else {
    return notAuthenticated;
  }
}

export default Layout;
