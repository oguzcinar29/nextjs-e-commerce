"use client";
import { siteURL } from "@/URL";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Purchase() {
  const [orders, setOrders] = useState<any[]>([]);

  const { data: session } = useSession();

  const getOrders = async () => {
    try {
      const res = await fetch(`${siteURL}/api/orders/${session?.user?.id}`, {
        cache: "no-cache",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch orders data");
      } else {
        console.log("succes log");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="w-2/3">
      <div>
        <b>Purchased Products</b>
      </div>
    </div>
  );
}
