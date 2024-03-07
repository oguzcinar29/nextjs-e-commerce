"use client";
import {
  ProductContext,
  productContextType,
} from "@/components/ProductsContext/ProductsContext";
import { useContext } from "react";

export default function SingleProduct({ params }: any) {
  const { id } = params;
  const { products } = useContext<productContextType>(ProductContext);

  const findProduct = products?.find((item: any) => item._id === id);
  console.log(findProduct);
  const category: string | undefined = findProduct?.category ?? "";

  return (
    <div className="pt-10 pb-32">
      <div className="flex gap-5">
        <div className="w-1/2 flex justify-center items-center">
          <img className="w-80 h-80" src={findProduct?.image} alt="" />
        </div>
        <div className="w-1/2 flex flex-col gap-4">
          <b className="text-xl">{findProduct?.title}</b>
          <span>
            {category?.charAt(0).toUpperCase() + category?.slice(1)}|{" "}
            <span>In stock</span>
          </span>
          <span>${findProduct?.price}</span>
          <b className="pt-3">Description</b>
          <p className="text-base  text-gray-800 leading-8 font-normal">
            {findProduct?.description}
          </p>
          <button className="bg-black text-white pt-3 pb-3 rounded-lg">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
