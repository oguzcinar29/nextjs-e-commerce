"use client";
import {
  ProductContext,
  productContextType,
} from "@/components/ProductsContext/ProductsContext";
import Product from "@/components/shop/Products/Product";
import { useContext } from "react";

export default function SingleProduct({ params }: any) {
  const { id } = params;
  const { products, pickCategory, card, setCard } =
    useContext<productContextType>(ProductContext);

  const findProduct = products?.find((item: any) => item._id === id);
  const category: string | undefined = findProduct?.category ?? "";

  function handleClick() {
    const newObj = {
      ...findProduct,
      count: 1,
    };
    const existProducts = JSON.parse(
      window.localStorage.getItem("products") || "[]"
    );
    if (existProducts === null) {
      localStorage.setItem("products", JSON.stringify([newObj]));
      setCard(newObj as any);
    } else {
      var oldItems = JSON.parse(
        (typeof window !== "undefined" &&
          window.localStorage.getItem("products")) ||
          "[]"
      );
      var findItem = oldItems.find(
        (item: any) => item._id === findProduct?._id
      );

      if (findItem) {
        console.log("find item");

        const newObj2 = {
          ...findItem,
          count: findItem.count + 1,
        };
        const findIndex = oldItems.findIndex(
          (item: any) => item._id === findItem._id
        );
        console.log(findIndex);
        oldItems[findIndex].count += 1;
        localStorage.setItem("products", JSON.stringify(oldItems));
      } else {
        oldItems.push(newObj);
        localStorage.setItem("products", JSON.stringify(oldItems));
      }
      setCard(oldItems as any);
    }
  }

  return (
    <div className="pt-20 pb-10 flex flex-col gap-32">
      <div className="flex gap-5 1000max:flex-col 1000max:justify-center 1000max:items-center">
        <div className="w-1/2 flex justify-center items-center 1000max:w-full">
          <img
            className="w-80 h-80 min-h-80 min-w-80"
            src={findProduct?.image}
            alt=""
          />
        </div>
        <div className="w-1/2 1000max:w-full 1000max:pt-10 flex flex-col gap-4">
          <b className="text-xl">{findProduct?.title}</b>
          <div className="flex gap-2">
            <span>
              {category?.charAt(0).toUpperCase() + category?.slice(1)}
            </span>
            | <span className="text-green-500">In stock</span>
          </div>
          <span>${findProduct?.price}</span>
          <div className="flex flex-col gap-2">
            <b className="pt-3">Description</b>
            <p className="text-base  text-gray-800 leading-8 font-normal">
              {findProduct?.description}
            </p>
          </div>

          <button
            onClick={handleClick}
            className="bg-black text-white pt-3 pb-3 rounded-lg"
          >
            Add to cart
          </button>
        </div>
      </div>
      <div>
        <span className="text-2xl font-medium">Related Products</span>
        <div className="flex flex-wrap gap-16  750max:justify-center 750max:items-center pt-10">
          {products?.map((item: any, indx: any) => {
            if (item.category === pickCategory && item._id !== id) {
              return (
                <Product
                  category={item.category}
                  title={item.title}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                  key={indx}
                  id={item._id}
                />
              );
            }
            if (pickCategory === "" || pickCategory === "all") {
              return (
                <Product
                  category={item.category}
                  title={item.title}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                  key={indx}
                  id={item._id}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
