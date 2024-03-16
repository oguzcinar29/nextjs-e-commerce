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
import Link from "next/link";
import { siteURL } from "@/URL";

export function CarouselDemo() {
  const { products, setPickCategory } =
    React.useContext<productContextType>(ProductContext);
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {products?.map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <Link
                    onClick={() => setPickCategory(products[index].category)}
                    href={`${siteURL}/product/${products[index]._id}`}
                    className="text-xl text-start flex flex-col gap-3 font-semibold"
                  >
                    <div className="flex mb-3 justify-center items-center">
                      <img
                        className="w-52 h-52 "
                        src={products[index]?.image}
                        alt={products[index]?.title}
                      />
                    </div>
                    <span className="font-extrabold">
                      {products[index]?.title}...
                    </span>
                    <span className="pt-3">
                      {products[index]?.description.slice(0, 20)}...
                    </span>
                    <span>${products[index]?.price}</span>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
