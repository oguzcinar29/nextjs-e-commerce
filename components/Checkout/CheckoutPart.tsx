import { useContext } from "react";
import CheckoutCardItem from "./CheckoutCardItem";
import {
  ProductContext,
  productContextType,
} from "../ProductsContext/ProductsContext";

export default function CheckoutPart() {
  const { card } = useContext<productContextType>(ProductContext);
  const getTotal = () => {
    let total = 0;
    card?.forEach((item: any) => {
      total += item.count * item.price;
    });
    return total;
  };
  return (
    <div className="flex flex-col pt-10 pb-10">
      <b className="font-black text-3xl pb-5">Checkout</b>
      <div className="flex justify-between pb-2">
        <div className="w-3/5 650max:w-1/3">Products</div>
        <div className="w-1/5  650max:w-1/3">Quantity</div>
        <div className="w-1/5  650max:w-1/3 text-end pr-5">Subtotal</div>
      </div>
      <hr />
      <div className="flex flex-col gap-7 pt-4 650max:gap-10 sticky overflow-y-scroll h-96 ">
        {card?.map((item, indx) => {
          return <CheckoutCardItem {...item} key={indx} />;
        })}
      </div>
      <div className="flex justify-between mt-10 p-6 text-lg bg-gray-200">
        <b>Order Total</b>
        <b>${getTotal().toFixed(2)}</b>
      </div>
    </div>
  );
}
