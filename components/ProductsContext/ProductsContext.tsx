"use client";

import { siteURL } from "@/URL";
import { useSession } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";

export type Product = {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  _id: string;
  count: number;
};
export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  __v: number;
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
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  cardId: string;
  setCardId: React.Dispatch<React.SetStateAction<string>>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  card: Product[];
  setCard: React.Dispatch<React.SetStateAction<Product[]>>;
  categories: string[];
  pickCategory: string;
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;

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
  users: [],
  setUsers: () => {},
  pickCategory: "",
  setPickCategory: () => {},
  setCategories: () => {},
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

  const [categories, setCategories] = useState<string[]>([]);

  const getCategories = async () => {
    try {
      const res = await fetch(`${siteURL}/api/categories`, {
        cache: "no-cache",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch categories data");
      } else {
        const data = await res.json();
        setCategories(data.categories);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  const [pickCategory, setPickCategory] = useState<string | null>("all");

  const [card, setCard] = useState<Card[]>([]);

  const [cardId, setCardId] = useState<string>("");

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

  const [users, setUsers] = useState<User[]>([]);
  const getUsers = async () => {
    try {
      const res = await fetch(`${siteURL}/api/users`, {
        cache: "no-cache",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch users");
      } else {
        const data = await res.json();
        setUsers(data.users);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {}, []);

  const values: any = {
    products,
    setProducts,
    categories,
    pickCategory,
    setCategories,
    setPickCategory,
    productsLoading,
    setProductsLoading,
    card,
    setCard,
    cardId,
    setCardId,
    users,
    setUsers,
  };

  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
};
export default ProductProvider;
