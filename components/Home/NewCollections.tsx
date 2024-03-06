"use client";
import { useContext } from "react";
import { CarouselSpacing } from "./CollectionCarousel";
import {
  ProductContext,
  productContextType,
} from "../ProductsContext/ProductsContext";
import { CarouselDemo } from "./CarouselMobile";

export default function NewCollections() {
  const { products } = useContext<productContextType>(ProductContext);
  return (
    <div>
      <div className="text-center pt-20 pb-20 flex flex-col gap-10">
        <h1 className="text-2xl font-semibold">New Collections</h1>
        <div className="text-left">
          <span className="font-extrabold">
            Showing of {products?.length} Products
          </span>
        </div>
        <div className="750max:hidden">
          <CarouselSpacing />
        </div>
        <div className="750in:hidden flex justify-center items-center">
          <CarouselDemo />
        </div>
      </div>
    </div>
  );
}
