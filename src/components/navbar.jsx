"use client";

import { useSession, signOut } from "next-auth/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  User,
} from "@nextui-org/react";
// import { useState, useRef, useEffect } from "react";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const { status, data: session } = useSession();

  return (
    <div className="flex justify-between pb-4 border-b-2 relative">
      <div>
        <Link href={"/"}>
          <h1 className="text-dark text-4xl font-bold tracking-tighter">
            My-TechNews
          </h1>
        </Link>
        <p className="text-sm">
          Exploring Tomorrows Innovations, <br /> One Byte at a Time
        </p>
      </div>

      {status === "authenticated" ? (
        <>
          <div className="flex items-center">
            <Dropdown className="absolute z-30 right-0 bg-white p-6 shadow-lg rounded-md flex flex-col gap-2 text-right min-w-[160px]">
              <DropdownTrigger>
                {/* <p className="font-bold mr-5 hidden md:flex">{session.user.name}</p> */}
                <User
                  name={session.user.name}
                  description="User"
                  avatarProps={{
                    src: `${session?.user?.image || "/profile.png"}`,
                  }}
                />
                {/* <Image
                  src={session?.user?.image || "/profile.png"}
                  width={36}
                  height={36}
                  alt="profile"
                  className="rounded-full shadow-md cursor-pointer"
                /> */}
              </DropdownTrigger>
              <DropdownMenu aria-label="Dynamic Actions">
                <DropdownItem href={"/dashboard"}>Dashboard</DropdownItem>
                <DropdownItem href={"/create-post"}>Create Post</DropdownItem>
                <DropdownItem key="copy">
                  <Button
                    onClick={() => signOut()}
                    className="text-red-600 font-bold"
                  >
                    Sign Out
                  </Button>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </>
      ) : (
        <div className="flex items-center">
          <Button>
            <Link className="text-green-600 font-bold" href={"/sign-in"}>
              Sign In
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};
export default Navbar;
