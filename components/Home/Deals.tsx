"use client";
import { ArrowRight, Gift, ShoppingCart } from "lucide-react";
import dealsImg from "@/public/assets/images/image-4.svg";
import Link from "next/link";
import { useContext } from "react";
import {
  ProductContext,
  productContextType,
} from "../ProductsContext/ProductsContext";

export default function Deals() {
  const { pickCategory, setPickCategory } =
    useContext<productContextType>(ProductContext);
  return (
    <div className="flex justify-between  gap-28 items-center pt-10 pb-10">
      <div className="w-3/5 flex flex-col gap-10 1000max:w-full 1000max:justify-center 1000max:items-center">
        <h2 className="font-bold text-3xl">Deals of the Month</h2>
        <p className="text-base font-medium leading-relaxed text-gray-800   ">
          Get ready for a shopping experience like never before with our Deals
          of the Month! Every purchase comes with exclusive perks and offers,
          making this month a celebration of savvy choices and amazing deals.
          Dont mis out.
        </p>
        <div className="flex gap-7 flex-wrap 1000max:justify-center 1000max:items-center">
          <div className="border border-gray-200 rounded-sm p-6">
            <span className=" flex flex-col items-center ">
              <b className="text-2xl font-black">7</b> Days
            </span>
          </div>

          <div className="border border-gray-200 rounded-sm p-6">
            <span className=" flex flex-col items-center ">
              <b className="text-2xl font-black">7</b> Hour
            </span>
          </div>

          <div className="border border-gray-200 rounded-sm p-6">
            <span className=" flex flex-col items-center ">
              <b className="text-2xl font-black">7</b> Mins
            </span>
          </div>

          <div className="border border-gray-200 rounded-sm p-6">
            <span className=" flex flex-col items-center ">
              <b className="text-2xl font-black">7</b> Secs
            </span>
          </div>
        </div>
        <Link
          className="flex gap-2 items-center bg-black w-40 p-1 pt-4 pb-4 rounded-lg text-white justify-center"
          href="/shop"
          onClick={() => setPickCategory("all")}
        >
          View Products{" "}
          <span>
            <ArrowRight size={16} strokeWidth={1} />
          </span>
        </Link>
      </div>
      <div className="w-2/5 1000max:hidden">
        <img src={dealsImg.src} alt="hey" />
      </div>
    </div>
  );
}
