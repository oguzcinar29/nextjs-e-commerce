"use client";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FormEvent, useContext, useEffect, useState } from "react";
import { siteURL } from "@/URL";
import {
  ProductContext,
  User,
  productContextType,
} from "../ProductsContext/ProductsContext";
import { useRouter } from "next/navigation";

export default function PersonalInfo() {
  const { data: session } = useSession();

  const [users, setUsers] = useState<any | null>(null);

  const [email, setEmail] = useState<string>("");

  const [name, setName] = useState<string>("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch(`${siteURL}/api/users`, {
          next: { revalidate: 10 },
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${siteURL}/api/users/${session?.user?.id.toString()}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ name, email }),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to send user data");
      } else {
        console.log("succeses");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-2/3 1000max:w-full ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <h1 className="font-extrabold text-lg 1000max:text-center">
          Personal Information
        </h1>
        <div>
          <Label>Email Address *</Label>
          <Input
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Label>Name *</Label>
          <Input value={name || ""} onChange={(e) => setName(e.target.value)} />
        </div>
        <span>
          Change your account details below, or{" "}
          <span className="underline cursor-pointer">click here</span> to change
          your password.
        </span>
        <Button className="w-40 " type="submit">
          Update Account
        </Button>
      </form>
    </div>
  );
}
