import { User } from "next-auth";
import React from "react";

type DesktopSidebarProps = {
  currentUser: User;
};
const DesktopSidebar = ({ currentUser }: DesktopSidebarProps) => {
  return <div>DesktopSidebar</div>;
};

export default DesktopSidebar;
