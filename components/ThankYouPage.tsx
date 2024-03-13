import Link from "next/link";
import { Button } from "./ui/button";

export default function ThankYouPage() {
  return (
    <div className="text-center pt-16 pb-7 flex flex-col gap-5">
      <h1 className="font-black text-black text-6xl">
        Thank you for your order!
      </h1>
      <p>
        Your order has been confirmed. You will receive an email confirmation
        shortly. Your order ID is 636326KOF344FL4
      </p>
      <div className="flex gap-3 justify-center items-center">
        <Link href="/profile/my-orders">
          <Button>View order</Button>
        </Link>
        <Link href="/profile/my-purchase">
          <Button className="border border-black" variant={"outline"}>
            View all orders
          </Button>
        </Link>
      </div>
    </div>
  );
}
