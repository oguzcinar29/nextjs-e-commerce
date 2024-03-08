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
import { useContext, useState } from "react";
import {
  ProductContext,
  productContextType,
} from "../ProductsContext/ProductsContext";
import CardItem from "./CardItem";
import { Button } from "../ui/button";
export default function MobileLinks() {
  const { card } = useContext<productContextType>(ProductContext);

  return (
    <>
      <Sheet>
        <SheetTrigger className="650min:hidden">
          <Menu />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetDescription className="flex flex-col  pt-10 gap-10">
              <Link className="text-slate-600 text-lg" href="/">
                Home
              </Link>
              <Link className="text-slate-600 text-lg" href="/shop">
                Shop
              </Link>

              <Link className="text-black  rounded-lg text-lg " href="/login">
                Login
              </Link>
              <Sheet>
                <SheetTrigger className="650min:hidden  flex justify-center items-center text-black">
                  <ShoppingCart />
                  <span>({card?.length})</span>
                </SheetTrigger>
                <SheetContent className="w-full flex flex-col gap-5">
                  <SheetHeader className="text-2xl">
                    <b>Orders</b>
                  </SheetHeader>
                  <div className="flex flex-col gap-5 sticky overflow-y-scroll h-90 ">
                    {card &&
                      !!card.length &&
                      card?.map((item: any, indx: any) => {
                        return <CardItem {...item} key={indx} />;
                      })}
                  </div>
                  <Button className="w-full">Order Now</Button>
                </SheetContent>
              </Sheet>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
