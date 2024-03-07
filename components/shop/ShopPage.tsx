"use client";

import { useContext } from "react";
import {
  ProductContext,
  productContextType,
} from "../ProductsContext/ProductsContext";
import CategoriesButtons from "./CategoriesButtons";
import SoryBy from "./SoryBy";
import Products from "./Products/Products";
export default function ShopPage() {
  const { categories } = useContext<productContextType>(ProductContext);

  return (
    <div className="flex pt-10 pb-10 550max:flex-col 550max:justify-center 550max:items-center">
      <div className="w-1/4 flex flex-col gap-10 650max:hidden">
        <div>
          <b>Product Categories</b>
          <CategoriesButtons />
        </div>
        <div>
          <b>Sort By</b>
          <SoryBy />
        </div>
      </div>
      <div className="w-3/4 flex flex-wrap gap-5  ">
        <Products />
      </div>
    </div>
  );
}
