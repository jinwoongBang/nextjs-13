"use client";
import Link from "next/link";
import React, { useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const [open, setOpen] = useState(true);

  const routes = [
    { title: "Home", path: "/" },
    { title: "Question", path: "/question" },
    { title: "State", path: "/state" },
    { title: "Quiz", path: "/quiz" },
  ];
  return (
    <header className="shadow-lg">
      <div
        className={`fixed lg:hidden transition-all z-20 duration-300 ${
          open ? "right-0" : "-right-64"
        } p-4 bg-orange-500 h-screen w-64`}
      >
        <XCircleIcon
          className={`w-8 h-8 stroke-slate-50 mb-4`}
          stroke="2"
          onClick={() => setOpen(false)}
        ></XCircleIcon>
        <div className="flex flex-col space-y-4" onClick={() => setOpen(false)}>
          {routes.map((route) => (
            <Link
              className="px-6 py-2 text-slate-100 rounded bg-orange-700"
              href={route.path}
              key={route.path}
            >
              {route.title}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
