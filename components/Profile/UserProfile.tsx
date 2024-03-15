"use client";
import {
  Package,
  User2Icon,
  UserCircle2,
  UserIcon,
  WalletCards,
  WalletCardsIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import {
  ProductContext,
  productContextType,
} from "../ProductsContext/ProductsContext";
import { useRouter } from "next/navigation";
import { siteURL } from "@/URL";

export default function UserProfile() {
  const { data: session } = useSession();

  const [users, setUsers] = useState<any | null>(null);

  const [email, setEmail] = useState<string>("");

  const [name, setName] = useState<string>("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch(`${siteURL}/api/users`, {
          cache: "no-cache",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch users data");
        } else {
          const users = await res.json();
          setUsers(users.users);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);

  useEffect(() => {
    if (users && session) {
      const findUser = users.find(
        (item: any) => item._id.toString() === session.user.id.toString()
      );
      if (findUser) {
        setEmail(findUser.email);
        setName(findUser.name);
      }
    }
  }, [users, session]);

  const router = useRouter();

  return (
    <div className="w-1/3 flex flex-col gap-8  1000max:w-full ">
      <h1 className="text-3xl font-extrabold from-neutral-950 1000max:text-center ">
        My Profile
      </h1>
      <div className="pl-4 flex flex-col gap-10">
        <div className="flex gap-2">
          <UserCircle2 className="w-12 h-12 min-h-12 min-w-12" />
          <div className="flex flex-col gap-0">
            <b>{name}</b>
            <span>{email}</span>
          </div>
        </div>
        <Link
          className="flex items-center gap-3"
          href="/profile/personal-information"
        >
          <span>
            <UserIcon />
          </span>
          Personal Information
        </Link>
        <Link className="flex items-center gap-3" href="/profile/my-purchase">
          <span>
            <WalletCards />
          </span>
          My Purchases
        </Link>
        <Link className="flex items-center gap-3" href="/profile/my-orders">
          <span>
            <Package />
          </span>
          My Orders
        </Link>
      </div>
    </div>
  );
}
