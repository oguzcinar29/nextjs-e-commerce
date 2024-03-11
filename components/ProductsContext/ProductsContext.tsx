"use client";

import { siteURL } from "@/URL";
import React, { createContext, useEffect, useState } from "react";

export type Product = {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  _id: string;
};
export type Card = {
  count: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  _id: string;
};
export type productContextType = {
  products: Product[];
  cardId: string;
  setCardId: React.Dispatch<React.SetStateAction<string>>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  card: Product[];
  setCard: React.Dispatch<React.SetStateAction<Product[]>>;
  categories: string[];
  pickCategory: string;
  setPickCategory: React.Dispatch<React.SetStateAction<string>>;
  productsLoading: boolean;
  setProductsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const productContextDefaultValue: productContextType = {
  products: [],
  setProducts: () => {},
  card: [],
  cardId: "",
  setCardId: () => {},
  setCard: () => {},
  categories: [],
  pickCategory: "",
  setPickCategory: () => {},
  productsLoading: false,
  setProductsLoading: () => {},
};

export const ProductContext = createContext<productContextType>(
  productContextDefaultValue
);

const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>();

  const [productsLoading, setProductsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      await fetch(`${siteURL}/api/products`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.data);
          setProductsLoading(true);
        });
    };
    getData();
  }, []);

  const categoryCount = products?.map((item: Product) => {
    return item.category;
  });
  const categories = categoryCount?.filter(function (item: any, pos: any) {
    return categoryCount.indexOf(item) == pos;
  });

  const [pickCategory, setPickCategory] = useState<string | null>("all");

  const [card, setCard] = useState<Card[]>([]);

  const [cardId, setCardId] = useState<string>("");

  console.log(cardId);

  useEffect(() => {
    setCard(
      JSON.parse(
        (typeof window !== "undefined" &&
          window.localStorage.getItem("products")) ||
          "[]"
      ) || null
    );
    setCardId(
      JSON.parse(
        (typeof window !== "undefined" &&
          window.localStorage.getItem("cardId")) ||
          "[]"
      ) || ""
    );
  }, []);

  const values: any = {
    products,
    setProducts,
    categories,
    pickCategory,
    setPickCategory,
    productsLoading,
    setProductsLoading,
    card,
    setCard,
    cardId,
    setCardId,
  };

  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
};
export default ProductProvider;
