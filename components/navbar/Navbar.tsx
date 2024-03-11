"use client";
import Link from "next/link";
import {
  Sheet,
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
import MobileLinks from "./MobileLinks";
import { useContext, useEffect, useState } from "react";
import {
  ProductContext,
  productContextType,
} from "../ProductsContext/ProductsContext";
import CardItem from "./CardItem";
import { Button } from "../ui/button";
import { getServerSession } from "next-auth";
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

export default function Navbar() {
  const { card, setCard } = useContext<productContextType>(ProductContext);

  const { data: session } = useSession();

  const getTotal = () => {
    let total = 0;
    card?.forEach((item: any) => {
      total += item.count * item.price;
    });
    return total;
  };

  return (
    <nav>
      <div className="flex justify-between pt-5 pb-5  items-center">
        <Link href="/">
          <svg
            width="180"
            height="30"
            viewBox="0 0 180 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.01647 24V9.912H0.960469V6.72H18.2405V9.912H11.2085V24H8.01647ZM24.4274 24C23.8194 24 23.2674 23.848 22.7714 23.544C22.2754 23.24 21.8754 22.84 21.5714 22.344C21.2674 21.848 21.1154 21.296 21.1154 20.688V13.392C21.1154 12.784 21.2674 12.232 21.5714 11.736C21.8754 11.24 22.2754 10.84 22.7714 10.536C23.2674 10.232 23.8194 10.08 24.4274 10.08H31.9394C32.5474 10.08 33.0994 10.232 33.5954 10.536C34.1074 10.84 34.5074 11.24 34.7954 11.736C35.0994 12.232 35.2514 12.784 35.2514 13.392V18.624H24.2594V20.568C24.2594 20.648 24.2834 20.72 24.3314 20.784C24.3954 20.832 24.4674 20.856 24.5474 20.856H35.2514V24H24.4274ZM24.2594 15.792H32.1074V13.512C32.1074 13.432 32.0754 13.368 32.0114 13.32C31.9634 13.256 31.8994 13.224 31.8194 13.224H24.5474C24.4674 13.224 24.3954 13.256 24.3314 13.32C24.2834 13.368 24.2594 13.432 24.2594 13.512V15.792ZM41.6821 24C41.0741 24 40.5221 23.848 40.0261 23.544C39.5301 23.24 39.1301 22.84 38.8261 22.344C38.5221 21.848 38.3701 21.296 38.3701 20.688V13.392C38.3701 12.784 38.5221 12.232 38.8261 11.736C39.1301 11.24 39.5301 10.84 40.0261 10.536C40.5221 10.232 41.0741 10.08 41.6821 10.08H52.4821V13.224H41.8021C41.7221 13.224 41.6501 13.256 41.5861 13.32C41.5381 13.368 41.5141 13.432 41.5141 13.512V20.568C41.5141 20.648 41.5381 20.72 41.5861 20.784C41.6501 20.832 41.7221 20.856 41.8021 20.856H52.5061V24H41.6821ZM55.7437 24V5.52H58.8877V10.08H66.5677C67.1757 10.08 67.7277 10.232 68.2237 10.536C68.7197 10.84 69.1197 11.24 69.4237 11.736C69.7277 12.232 69.8797 12.784 69.8797 13.392V24H66.7357V13.512C66.7357 13.432 66.7037 13.368 66.6397 13.32C66.5917 13.256 66.5277 13.224 66.4477 13.224H59.1757C59.0957 13.224 59.0237 13.256 58.9597 13.32C58.9117 13.368 58.8877 13.432 58.8877 13.512V24H55.7437Z"
              fill="black"
            />
            <path
              d="M81.5828 24V6.72H84.7508V13.752H96.0788V6.72H99.2468V24H96.0788V16.968H84.7508V24H81.5828ZM106.389 24C105.781 24 105.221 23.848 104.709 23.544C104.213 23.24 103.813 22.84 103.509 22.344C103.221 21.848 103.077 21.296 103.077 20.688V15.456H114.069V13.512C114.069 13.432 114.037 13.368 113.973 13.32C113.925 13.256 113.861 13.224 113.781 13.224H103.077V10.08H113.901C114.509 10.08 115.061 10.232 115.557 10.536C116.069 10.84 116.469 11.24 116.757 11.736C117.061 12.232 117.213 12.784 117.213 13.392V24H106.389ZM106.509 20.856H114.069V18.288H106.221V20.568C106.221 20.648 106.245 20.72 106.293 20.784C106.357 20.832 106.429 20.856 106.509 20.856ZM127.08 24L119.424 10.08H123.048L128.544 20.184L134.016 10.08H137.64L129.96 24H127.08ZM142.89 24C142.282 24 141.73 23.848 141.234 23.544C140.738 23.24 140.338 22.84 140.034 22.344C139.73 21.848 139.578 21.296 139.578 20.688V13.392C139.578 12.784 139.73 12.232 140.034 11.736C140.338 11.24 140.738 10.84 141.234 10.536C141.73 10.232 142.282 10.08 142.89 10.08H150.402C151.01 10.08 151.562 10.232 152.058 10.536C152.57 10.84 152.97 11.24 153.258 11.736C153.562 12.232 153.714 12.784 153.714 13.392V18.624H142.722V20.568C142.722 20.648 142.746 20.72 142.794 20.784C142.858 20.832 142.93 20.856 143.01 20.856H153.714V24H142.89ZM142.722 15.792H150.57V13.512C150.57 13.432 150.538 13.368 150.474 13.32C150.426 13.256 150.362 13.224 150.282 13.224H143.01C142.93 13.224 142.858 13.256 142.794 13.32C142.746 13.368 142.722 13.432 142.722 13.512V15.792ZM157.467 24V10.08H168.291C168.899 10.08 169.451 10.232 169.947 10.536C170.459 10.84 170.859 11.24 171.147 11.736C171.451 12.232 171.603 12.784 171.603 13.392V24H168.459V13.512C168.459 13.432 168.427 13.368 168.363 13.32C168.315 13.256 168.251 13.224 168.171 13.224H160.899C160.819 13.224 160.747 13.256 160.683 13.32C160.635 13.368 160.611 13.432 160.611 13.512V24H157.467ZM175.378 24V20.856H178.522V24H175.378Z"
              fill="#14111C"
            />
          </svg>
        </Link>
        <div className="flex gap-8 items-center 650max:hidden">
          <Link className="text-slate-600 " href="/">
            Home
          </Link>
          <Link className="text-slate-600" href="/shop">
            Shop
          </Link>
          <Sheet>
            <SheetTrigger className="flex gap-1">
              <ShoppingCart />
              <span>({card.length})</span>
            </SheetTrigger>
            <SheetContent className="w-1/3 1000max:w-96 flex flex-col gap-5">
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
                    <span className="flex items-center gap-1 text-xl ">
                      Sub Total:{" "}
                      <b className="text-2xl">${getTotal().toFixed(2)}</b>
                    </span>
                    <Link
                      href={
                        !session?.user
                          ? "/login"
                          : "https://buy.stripe.com/test_eVa3f324SeFj4Hm6op"
                      }
                    >
                      <Button className="w-32 400max:w-40 "> Order Now</Button>
                    </Link>
                  </div>
                </div>
              )}
              {card?.length === 0 && (
                <div className="flex justify-center items-center mt-72">
                  <b className="text-3xl">Your cart is empty</b>
                </div>
              )}
            </SheetContent>{" "}
          </Sheet>
          {!session?.user && (
            <Link
              className="bg-black text-white rounded-lg  p-3 pl-5 pr-5"
              href="/login"
            >
              Login
            </Link>
          )}
          {session?.user && (
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex justify-center items-center">
                    <Settings />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 flex flex-col gap-2">
                  <DropdownMenuItem className="cursor-pointer">
                    <Link className="flex gap-1 items-center" href="/profile">
                      <span>
                        <UserIcon color="black" />
                      </span>
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
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
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
        <MobileLinks />
      </div>
    </nav>
  );
}
