"use client";
import img from "@/public/assets/images/image-1.svg";
import Image from "next/image";
import hand from "@/public/assets/icons/hand.png";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import logo from "@/public/logo-black.svg";
import { Button } from "../ui/button";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { FormEvent, useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { siteURL } from "@/URL";
import {
  ProductContext,
  productContextType,
} from "../ProductsContext/ProductsContext";
export default function Login() {
  const { card, setCard, setCardId, cardId } =
    useContext<productContextType>(ProductContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const { data: session } = useSession();

  const [err, setErr] = useState<string>("");

  console.log(cardId);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    if (!res?.error) {
      const res2 = await fetch(`${siteURL}/api/cards`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ card, email }),
      });
      const data = await res2.json();
      console.log(data);
      if (res2.ok) {
        window.localStorage.setItem("products", JSON.stringify(data.newArr));
        window.localStorage.setItem("cardId", JSON.stringify(data.cardId));
        setCard(data.newArr);
        setCardId(data.cardId);
        router.push("/");
        router.refresh();
      }
    } else {
      setErr("Invalid Error! Try again.");
    }
  };

  return (
    <div className="w-full overflow-y-visible  560min-h:bg-slate-100">
      <div className="flex gap-20 560min-h:flex 560min-h:justify-center 560min-h:items-center">
        <div className=" relative text-center 560min-h:hidden ">
          <img
            style={{ height: "100vh" }}
            src={img.src}
            alt="keyboard desk etc"
          />
          <img className="absolute top-8 left-16" src={logo.src} alt="" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-5  560min-h:justify-center  560min-h:h-screen "
        >
          <div className="pb-5">
            <b className="text-2xl flex gap-3">
              Welcome <img className="w-8 h-8" src={hand.src} alt="" />
            </b>
            <span className="text-gray-500">Please login here</span>
          </div>
          {err && (
            <Alert variant="destructive">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{err}</AlertDescription>
            </Alert>
          )}
          <div className="flex flex-col gap-3">
            <Label>Email Address *</Label>
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label>Password Address *</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-80 "
            />
          </div>
          <Button>Login</Button>
          <div className="flex justify-between items-center cursor-pointer">
            <Link href="/register">Create an account?</Link>
            <span>Forgot password?</span>
          </div>
        </form>
      </div>
    </div>
  );
}
