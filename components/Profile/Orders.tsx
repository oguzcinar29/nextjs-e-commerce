"use client";

import { siteURL } from "@/URL";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import PurchaseItem from "./PurchaseItem";

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);

  const { data: session } = useSession();

  const userId = session?.user?.id;
  const getOrders = async () => {
    try {
      const res = await fetch(`${siteURL}/api/orders/${userId}`, {
        cache: "no-cache",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch orders data");
      } else {
        const data = await res.json();
        setOrders(data.ordersArr);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getOrders();
  }, [session]);

  const [isClicked, setIsClicked] = useState<boolean>(false);

  return (
    <div className="w-2/3 1000max:w-full ">
      <div className="flex flex-col gap-10">
        <b className="font-black text-lg">My Orders</b>
        {orders && (
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-3">
              <b>Order 1243KOPRKOWE123</b>
              <span>Total: ${orders && orders[orders?.length - 1]?.price}</span>
              <span>Ordered On: 11/12/2024</span>
            </div>
            <span
              className="cursor-pointer"
              onClick={() => setIsClicked(!isClicked)}
            >
              View Order
            </span>
          </div>
        )}
        {isClicked && (
          <div className="flex flex-col gap-10 ">
            <div className="flex items-center gap-5">
              <div>
                <img
                  className="h-20 w-20 min-h-16 min-w-16"
                  src={orders && orders[orders?.length - 1]?.image}
                  alt={orders && orders[orders?.length - 1]?.title}
                />
              </div>
              <div className="flex flex-col gap-1">
                <b>{orders && orders[orders?.length - 1]?.title}</b>
                <span>
                  $
                  {orders &&
                    orders[orders?.length - 1]?.count *
                      orders[orders?.length - 1]?.price}
                </span>
                <span>Purchased On: 11/15/2024</span>
              </div>
            </div>
          </div>
        )}
        {!orders && <h1>No orders yet...</h1>}
      </div>
    </div>
  );
}
