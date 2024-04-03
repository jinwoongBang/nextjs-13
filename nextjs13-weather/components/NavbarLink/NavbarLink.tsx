import { ubuntuBold } from "@/fonts/ubuntu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface INavbarLinkProps {
  href: string;
  children: string;
}

const NavbarLink = ({ href, children: text }: INavbarLinkProps) => {
  return (
    <li>
      <Link
        href={href}
        className={`navbarLink__link p-1
      text-[1.17rem] hover:text-[var(--sky-color)] 
      transition-all 
      duration-500 ease-out ${ubuntuBold.className}
      `}
      >
        {text}
      </Link>
    </li>
  );
};

export default NavbarLink;
