"use client";

import { siteURL } from "@/URL";
import React, { createContext, useEffect, useState } from "react";

export type Product = {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};
export type productContextType = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  categories: string[];
};

export const productContextDefaultValue: productContextType = {
  products: [],
  setProducts: () => {},
  categories: [],
};

export const ProductContext = createContext<productContextType>(
  productContextDefaultValue
);

const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    fetch(`${siteURL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data.data));
  }, []);

  console.log(products);
  const categoryCount = products?.map((item: Product) => {
    return item.category;
  });
  const categories = categoryCount?.filter(function (item: any, pos: any) {
    return categoryCount.indexOf(item) == pos;
  });

  const values: any = { products, setProducts, categories };

  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
};
export default ProductProvider;
