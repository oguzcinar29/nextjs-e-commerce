import { siteURL } from "@/URL";
import {
  ProductContext,
  productContextType,
} from "@/components/ProductsContext/ProductsContext";
import Link from "next/link";
import React, { useContext } from "react";

export default function Product(props: {
  id: string;
  price: number;
  title: string;
  description: string;
  category: string;
  image: string;
}) {
  const { setPickCategory } = useContext<productContextType>(ProductContext);
  return (
    <Link
      onClick={() => setPickCategory(props.category)}
      href={`${siteURL}/product/${props.id}`}
      className=" flex flex-col gap-3 border border-gray-200 p-5 "
    >
      <img
        className="w-48 h-48 min-h-48 min-w-48 "
        src={props.image}
        alt={props.title}
      />

      <b>{props.title.slice(0, 20)}...</b>
      <span>{props.description.slice(0, 20)}...</span>
      <span>${props.price}</span>
    </Link>
  );
}
