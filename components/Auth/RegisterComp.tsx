"use client";
import img from "@/public/assets/images/image-2.svg";
import Image from "next/image";
import hand from "@/public/assets/icons/hand.png";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import logo from "@/public/logo-black.svg";
import { Button } from "../ui/button";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { siteURL } from "@/URL";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
export default function RegisterComp() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [err, setError] = useState<string>("");

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
        const data = await res.json();
        setError(data.message);
      } else {
        router.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full overflow-y-visible">
      <div className="flex gap-20">
        <div className=" relative text-center">
          <img
            style={{ height: "100vh" }}
            src={img.src}
            alt="keyboard desk etc"
          />
          <img className="absolute top-8 left-16" src={logo.src} alt="" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-5 "
        >
          <div className="pb-5">
            <b className="text-2xl flex gap-3">
              Welcome <img className="w-8 h-8" src={hand.src} alt="" />
            </b>
            <span className="text-gray-500">Please enter details</span>
          </div>
          {err && (
            <Alert variant="destructive">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{err}</AlertDescription>
            </Alert>
          )}
          <div className="flex flex-col gap-3">
            <Label className="text-gray-600">Full Name *</Label>
            <Input
              type="text"
              value={name}
              className="w-80"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label className="text-gray-600">Email Address *</Label>
            <Input
              type="text"
              value={email}
              className="w-80"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label className="text-gray-600">Password *</Label>
            <Input
              type="password"
              value={password}
              className="w-80 "
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label className="text-gray-600">Confirm Password *</Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-80 "
            />
          </div>

          <Button type="submit">Register</Button>
          <div className="flex justify-between items-center cursor-pointer">
            <span>
              Already have an account?{" "}
              <Link href="/login">
                <b>Login</b>
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
