"use client";

import Image from "next/image";

import useActiveList from "../hooks/useActiveList";
import { User } from "@prisma/client";

interface AvatarProps {
  user?: User;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;

  return (
    <div className="relative">
      <div className="relative inline-block overflow-hidden rounded-full h-9 w-9 md:h-11 md:w-11">
        <Image
          fill
          src={user?.image || "/images/placeholder.jpg"}
          alt="Avatar"
          sizes="30"
        />
      </div>
      {isActive ? (
        <span className="absolute top-0 right-0 block w-2 h-2 bg-green-500 rounded-full ring-2 ring-white md:h-3 md:w-3" />
      ) : null}
    </div>
  );
};

export default Avatar;
