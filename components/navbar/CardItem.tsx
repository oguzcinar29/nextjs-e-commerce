"use client";

import { Minus, Plus, Trash } from "lucide-react";
import {
  Card,
  ProductContext,
  productContextType,
} from "../ProductsContext/ProductsContext";
import { useContext } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { siteURL } from "@/URL";

export default function CardItem(props: Card) {
  const { setCard, card } = useContext<productContextType>(ProductContext);

  const { data: session } = useSession();

  const decreaseCount = async (id: any) => {
    var items = JSON.parse(window.localStorage.getItem("products") || "[]");

    var findIndex = items.findIndex((item: any) => item._id === id);

    if (items[findIndex].count !== 1) {
      items[findIndex].count--;
    }

    setCard(items);

    window.localStorage.setItem("products", JSON.stringify(items));
  };
  const increaseCount = (id: any) => {
    var items = JSON.parse(window.localStorage.getItem("products") || "[]");

    var findIndex = items.findIndex((item: any) => item._id === id);

    items[findIndex].count++;
    setCard(items);
    window.localStorage.setItem("products", JSON.stringify(items));
  };
  const deleteItem = (id: any) => {
    toast("Order has been deleted", {
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
    var items = JSON.parse(window.localStorage.getItem("products") || "[]");

    var findIndex = items.findIndex((item: any) => item._id === id);

    items.splice(findIndex, 1);
    setCard(items);
    window.localStorage.setItem("products", JSON.stringify(items));
  };

  return (
    <div className="flex justify-between p-5 border border-gray-300 gap-10 550max:justify-start">
      <div className="flex gap-5">
        <img
          className="w-20 h-20 min-w-20 min-h-20 550max:min-w-14 550max:min-h-14 object-cover "
          src={props.image}
          alt={props.title}
        />
        <div className="flex flex-col justify-between gap-5 ">
          <span>{props.title}</span>
          <div className="flex gap-2 items-center">
            <Button
              variant={"secondary"}
              onClick={() => decreaseCount(props._id)}
            >
              <Minus />
            </Button>
            <span>{props.count}</span>
            <Button
              variant={"secondary"}
              onClick={() => increaseCount(props._id)}
            >
              <Plus />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between flex-col">
        <b>${props.price * props.count}</b>
        <button onClick={() => deleteItem(props._id)} className="text-red-500">
          <Trash />
        </button>
      </div>
    </div>
  );
}
