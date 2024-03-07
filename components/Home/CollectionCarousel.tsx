"use client";
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  ProductContext,
  productContextType,
} from "../ProductsContext/ProductsContext";
import Image from "next/image";
import Link from "next/link";
import { siteURL } from "@/URL";

export function CarouselSpacing() {
  const { products } = React.useContext<productContextType>(ProductContext);

  return (
    <Carousel className="w-full 750max:hidden">
      <CarouselContent className="-ml-1">
        {products?.map((item: any, index: any) => {
          if (index + 2 < products.length) {
            return (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1 flex flex-wrap">
                  {typeof products[index] !== "undefined" && (
                    <CarouselItem className="basis-1/3 flex flex-col text-start">
                      <Link
                        href={`${siteURL}/product/${products[index]._id}`}
                        className="flex mb-3 justify-center items-center"
                      >
                        <img
                          className="w-52 h-52 "
                          src={products[index]?.image}
                          alt={products[index]?.title}
                        />
                      </Link>
                      <span className="font-extrabold">
                        {products[index]?.title.slice(0, 40)}...
                      </span>
                      <span className="pt-3">
                        {products[index]?.description.slice(0, 40)}...
                      </span>
                      <span>${products[index]?.price}</span>
                    </CarouselItem>
                  )}
                  {typeof products[index] !== "undefined" && (
                    <CarouselItem className="basis-1/3 flex flex-col text-start">
                      <Link
                        href={`${siteURL}/product/${products[index + 1]._id}`}
                        className="flex mb-3 justify-center items-center"
                      >
                        <img
                          className="w-52 h-52 "
                          src={products[index + 1]?.image}
                          alt={products[index + 1]?.title}
                        />
                      </Link>
                      <span className="font-extrabold">
                        {products[index + 1]?.title.slice(0, 40)}...
                      </span>
                      <span className="pt-3">
                        {products[index + 1]?.description.slice(0, 40)}...
                      </span>
                      <span>${products[index + 1]?.price}</span>
                    </CarouselItem>
                  )}
                  {typeof products[index] !== "undefined" && (
                    <CarouselItem className="basis-1/3 flex flex-col text-start">
                      <Link
                        href={`${siteURL}/product/${products[index + 2]._id}`}
                        className="flex mb-3 justify-center items-center"
                      >
                        <img
                          className="w-52 h-52 "
                          src={products[index + 2]?.image}
                          alt={products[index + 2]?.title}
                        />
                      </Link>
                      <span className="font-extrabold">
                        {products[index + 2]?.title.slice(0, 40)}...
                      </span>
                      <span className="pt-3">
                        {products[index + 2]?.description.slice(0, 40)}...
                      </span>
                      <span>${products[index + 2]?.price}</span>
                    </CarouselItem>
                  )}
                </div>
              </CarouselItem>
            );
          }
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
