"use client";
import { useContext } from "react";
import {
  ProductContext,
  productContextType,
} from "../ProductsContext/ProductsContext";
import Category from "./Category";
import Link from "next/link";

export default function Categories() {
  const { categories } = useContext<productContextType>(ProductContext);

  return (
    <div>
      <div className="flex justify-between items-center pb-10 pt-12 550max:flex-col 550max:gap-3">
        <h1 className="text-2xl 550max:text-xl">Shop by Categories</h1>
        <Link href="/shop" className="font-normal">
          Show All
        </Link>
      </div>
      <div className="flex gap-10 flex-wrap justify-between 1000max:justify-center 1000max:items-center">
        {categories?.map((item: any, i) => {
          return <Category key={i} id={i} item={item.name} />;
        })}
      </div>
    </div>
  );
}
