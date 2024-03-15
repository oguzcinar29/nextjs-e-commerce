"use client";

import {
  ProductContext,
  productContextType,
} from "@/components/ProductsContext/ProductsContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useContext, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Button } from "@/components/ui/button";
import { siteURL } from "@/URL";
import { useRouter } from "next/navigation";

type UserProps = {
  id: any;
};

export default function UsersChangeInfoAdmin(props: UserProps) {
  const { users, setUsers } = useContext<productContextType>(ProductContext);

  const findUser = users?.find((item: any) => item._id === props.id.toString());

  console.log(findUser);

  const [name, setName] = useState<string>(findUser?.name || "");
  const [email, setEmail] = useState<string>(findUser?.email || "");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${siteURL}/api/users/${findUser?._id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) {
        throw new Error("Failed to update user data");
      } else {
        router.back();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col gap-5">
      <div>
        <SearchBar name={findUser?.name || ""} />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 bg-[#19376D] rounded-lg p-4 "
      >
        <div>
          <Label>Username</Label>
          <Input
            className="text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Input>
        </div>
        <div>
          <Label>Email</Label>
          <Input
            className="text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
        </div>
        <Button type="submit">Update</Button>
      </form>
    </div>
  );
}
