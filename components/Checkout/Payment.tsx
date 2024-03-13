"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useContext } from "react";
import {
  ProductContext,
  productContextType,
} from "../ProductsContext/ProductsContext";
import { siteURL } from "@/URL";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Payment() {
  const { card, setCard } = useContext<productContextType>(ProductContext);
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  async function handleClick() {
    try {
      const res = await fetch(`${siteURL}/api/orders`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ card, userId }),
      });
      if (!res.ok) {
        throw new Error("Failed to send card data");
      } else {
        console.log("success log");
        window.localStorage.removeItem("products");
        setCard([]);
        router.push("/thank-you");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="flex flex-col gap-3 pt-10">
      <b className="font-black text-3xl pb-5 650max:text-center">
        Payment Details
      </b>
      <div className="flex gap-5 650max:flex-wrap">
        <div className="w-3/5 650max:w-full">
          <Label htmlFor="">Card Number</Label>
          <Input type="text" placeholder="1234 1234 1234 1234" />
        </div>
        <div className="w-1/5 650max:w-full">
          <Label htmlFor="">Expiration</Label>
          <Input type="text" placeholder="MM / YY" />
        </div>
        <div className="w-1/5 650max:w-full">
          <Label htmlFor="">CVC</Label>
          <Input type="text" placeholder="CVC" />
        </div>
      </div>
      <div>
        <Label htmlFor="">Country</Label>
        <Input type="text" placeholder="Country" />
      </div>
      <div className="text-right">
        <Button onClick={handleClick} className="w-32">
          Checkout
        </Button>
      </div>
    </div>
  );
}
