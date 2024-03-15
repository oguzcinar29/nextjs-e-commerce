"use client";
import { siteURL } from "@/URL";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

import React, { FormEvent, useState } from "react";

export default function AddNewUserAdmin() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${siteURL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to make user");
      } else {
        router.push("/admin/users");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-[#19376D] rounded-lg p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3  ">
        <div>
          <Label>Username</Label>
          <Input
            className="text-black"
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
          ></Input>
        </div>
        <div>
          <Label>Email</Label>
          <Input
            className="text-black"
            value={email}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
        </div>
        <div>
          <Label>Password</Label>
          <Input
            className="text-black"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
        </div>
        <div>
          <Label>Confirm Password</Label>
          <Input
            className="text-black"
            value={confirmPassword}
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Input>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
