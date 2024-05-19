"use client";

import { Fragment, useMemo, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose, IoTrash } from "react-icons/io5";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";

import useOtherUser from "@/hooks/useOtherUser";
import useActiveList from "@/hooks/useActiveList";

import Avatar from "@/components/Avatar";
import AvatarGroup from "@/components/AvatarGroup";
// import ConfirmModal from "./ConfirmModal";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Conversation & {
    users: User[];
  };
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const otherUser = useOtherUser(data);

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), "PP");
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }

    return isActive ? "Active" : "Offline";
  }, [data, isActive]);

  return <></>;
};

export default ProfileDrawer;
