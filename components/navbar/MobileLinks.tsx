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
  const getTotal = () => {
    let total = 0;
    card.forEach((item: any) => {
      total += item.count * item.price;
    });
    return total;
  };

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
                {
                  <SheetContent className="w-full flex flex-col gap-5">
                    {card.length !== 0 && (
                      <div className="flex flex-col min-h-full justify-between gap-5">
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
                        <div className="flex justify-between">
                          <span className="flex items-center gap-1 text-xl 400max:flex-col ">
                            Sub Total:{" "}
                            <b className="text-2xl">${getTotal().toFixed(2)}</b>
                          </span>
                          <Button className="w-32 400max:w-40 ">
                            Order Now
                          </Button>
                        </div>
                      </div>
                    )}
                    {card.length === 0 && (
                      <div className="flex justify-center items-center mt-60">
                        <b className="text-3xl">Your cart is empty</b>
                      </div>
                    )}
                  </SheetContent>
                }
              </Sheet>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
