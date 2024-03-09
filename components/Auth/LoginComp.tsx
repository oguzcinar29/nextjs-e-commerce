"use client";
import img from "@/public/assets/images/image-1.svg";
import Image from "next/image";
import hand from "@/public/assets/icons/hand.png";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import logo from "@/public/logo-black.svg";
import { Button } from "../ui/button";
import Link from "next/link";
import { useState } from "react";
export default function Login() {
  const [email, setEmail] = useState<string | null>("");
  const [password, setPassword] = useState<string | null>("");

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
        <div className="flex flex-col justify-center gap-5 ">
          <div className="pb-5">
            <b className="text-2xl flex gap-3">
              Welcome <img className="w-8 h-8" src={hand.src} alt="" />
            </b>
            <span className="text-gray-500">Please login here</span>
          </div>
          <div className="flex flex-col gap-3">
            <Label>Email Address *</Label>
            <Input />
          </div>
          <div className="flex flex-col gap-3">
            <Label>Password Address *</Label>
            <Input className="w-80 " />
          </div>
          <Button>Login</Button>
          <div className="flex justify-between items-center cursor-pointer">
            <Link href="/register">Create an account?</Link>
            <span>Forgot password?</span>
          </div>
        </div>
      </div>
    </div>
  );
}
