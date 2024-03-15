"use client";
import ef from "@/public/logo-black.svg";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  LogOutIcon,
  Menu,
  Settings,
  ShoppingCart,
  UserIcon,
} from "lucide-react";
import { useContext, useState } from "react";
import {
  ProductContext,
  productContextType,
} from "../ProductsContext/ProductsContext";
import CardItem from "./CardItem";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function MobileLinks() {
  const { card, setCard } = useContext<productContextType>(ProductContext);
  const getTotal = () => {
    let total = 0;
    card.forEach((item: any) => {
      total += item.count * item.price;
    });
    return total;
  };
  const { data: session } = useSession();

  return (
    <>
      <Sheet>
        <SheetTrigger className="650min:hidden">
          <Menu />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetDescription className="flex flex-col  pt-10 gap-10">
              <SheetClose asChild>
                <Link className="text-slate-600 text-lg" href="/">
                  Home
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link className="text-slate-600 text-lg" href="/shop">
                  Shop
                </Link>
              </SheetClose>
              <SheetClose asChild>
                {!session?.user && (
                  <Link
                    className="text-black  rounded-lg text-lg "
                    href="/login"
                  >
                    Login
                  </Link>
                )}
              </SheetClose>
              <Sheet>
                <SheetClose asChild>
                  <SheetTrigger className="650min:hidden  flex justify-center items-center text-black">
                    <ShoppingCart />

                    <span>({card?.length})</span>
                  </SheetTrigger>
                </SheetClose>
                {
                  <SheetContent className="w-full flex flex-col gap-5">
                    {card.length !== 0 && (
                      <div className="flex flex-col min-h-full justify-between gap-5">
                        <SheetHeader className="text-2xl">
                          <b>Orders</b>
                        </SheetHeader>
                        <div className="flex flex-col gap-5 sticky overflow-y-scroll h-full ">
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
                          <SheetClose asChild>
                            <Link
                              href={!session?.user ? "/login" : "/checkout"}
                            >
                              <Button className="w-32 400max:w-40 ">
                                {" "}
                                Order Now
                              </Button>
                            </Link>
                          </SheetClose>
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
              {session?.user && (
                <div className="flex flex-col justify-center items-center gap-10">
                  <SheetClose asChild>
                    <Link className="flex gap-1 items-center" href="/profile">
                      <span>
                        <UserIcon color="black" />
                      </span>
                      Profile
                    </Link>
                  </SheetClose>
                  <button
                    className="flex gap-1 items-center"
                    onClick={() => {
                      window.localStorage.clear();
                      setCard([]);
                      signOut();
                    }}
                  >
                    <span>
                      <LogOutIcon color="black" />
                    </span>
                    Logout
                  </button>
                </div>
              )}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
