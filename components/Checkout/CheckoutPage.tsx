"use client";
import { useContext } from "react";
import {
  ProductContext,
  productContextType,
} from "../ProductsContext/ProductsContext";
import CheckoutCardItem from "./CheckoutCardItem";
import CheckoutPart from "./CheckoutPart";
import Payment from "./Payment";

export default function CheckoutPage() {
  const { card } = useContext<productContextType>(ProductContext);

  return (
    <div>
      <CheckoutPart />
      <Payment />
    </div>
  );
}
