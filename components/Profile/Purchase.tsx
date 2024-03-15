"use client";
import { siteURL } from "@/URL";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import PurchaseItem from "./PurchaseItem";

export const dynamic = "force-dynamic";

export default function Purchase() {
  const [orders, setOrders] = useState<any[]>([]);

  const { data: session } = useSession();

  const userId = session?.user?.id;
  console.log(userId);

  const getOrders = async () => {
    try {
      const res = await fetch(`${siteURL}/api/orders/${userId}`, {
        next: { revalidate: 0 },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch orders data");
      } else {
        console.log("hey");

        const data = await res.json();
        console.log(data);
        setOrders(data.ordersArr);

        console.log("succes log");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOrders();
  }, [session]);

  console.log(orders);

  return (
    <div className="w-2/3 1000max:w-full">
      <div className="flex flex-col gap-10">
        <b className="font-black text-lg">Purchased Products</b>
        <div className="flex flex-col gap-10 overflow-y-scroll h-64">
          {orders?.map((item: any, i) => {
            return <PurchaseItem {...item} key={i} />;
          })}
        </div>
      </div>
    </div>
  );
}
