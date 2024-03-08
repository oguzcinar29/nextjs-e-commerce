"use client";
import ef from "@/public/logo-black.svg";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, ShoppingCart } from "lucide-react";
import { useState } from "react";
export default function MobileLinks() {
  const [item, setItem] = useState(
    typeof window !== "undefined" &&
      JSON.parse(window.localStorage.getItem("products") || "[]")
  );

  return (
    <Sheet>
      <SheetTrigger className="650min:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetDescription className="flex flex-col pt-10 gap-10">
            <Link className="text-slate-600 text-lg" href="/">
              Home
            </Link>
            <Link className="text-slate-600 text-lg" href="/shop">
              Shop
            </Link>
            <Sheet>
              <SheetTrigger className="flex justify-center items-center text-black">
                <ShoppingCart />
              </SheetTrigger>
              <SheetContent className="w-1/3 1000max:w-90">
                <SheetHeader>
                  {item &&
                    !!item.length &&
                    item?.map((item: any, indx: any) => {
                      return <p key={indx}>{item.title}</p>;
                    })}
                </SheetHeader>
              </SheetContent>
            </Sheet>
            <Link className="text-black  rounded-lg text-lg " href="/login">
              Login
            </Link>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
