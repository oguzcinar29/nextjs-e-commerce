import {
  ProductContext,
  productContextType,
} from "@/components/ProductsContext/ProductsContext";
import { useContext } from "react";
import Product from "./Product";
import { Skeleton } from "@/components/ui/skeleton";

export default function Products() {
  const { products, pickCategory, productsLoading, setProductsLoading } =
    useContext<productContextType>(ProductContext);

  return (
    <div>
      <div className="flex flex-col gap-5 650max:justify-center 650max:items-center">
        <b>Showing of 15 Products</b>
        <div className="flex flex-wrap gap-10 justify-between 650max:justify-center 650max:items-center">
          {products?.map((item: any, indx: any) => {
            if (item.category === pickCategory) {
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
