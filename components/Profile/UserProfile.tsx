"use client";
import {
  Link,
  User2Icon,
  UserCircle2,
  UserIcon,
  WalletCards,
  WalletCardsIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";

export default function UserProfile() {
  const { data: session } = useSession();
  return (
    <div className="pt-20 pb-20">
      <div className="flex">
        <div className="w-1/3 flex flex-col gap-8">
          <h1 className="text-3xl font-extrabold">My Profile</h1>
          <div className="pl-7">
            <div className="flex gap-2">
              <UserCircle2 className="w-12 h-12" />
              <div className="flex flex-col gap-0">
                <b>{session?.user?.name}</b>
                <span>{session?.user?.email}</span>
              </div>
            </div>
            <div>
              <span>
                <UserIcon />
              </span>
              Personal Information
            </div>
            <Link>
              <span>
                <WalletCards />
              </span>
              My Purchases
            </Link>
          </div>
        </div>
        <div className="w-2/3">asf</div>
      </div>
    </div>
  );
}
