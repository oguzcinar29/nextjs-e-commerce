import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function Payment() {
  return (
    <div className="flex flex-col gap-3 pt-10">
      <b className="font-black text-3xl pb-5 650max:text-center">
        Payment Details
      </b>
      <div className="flex gap-5 650max:flex-wrap">
        <div className="w-3/5 650max:w-full">
          <Label htmlFor="">Card Number</Label>
          <Input type="text" placeholder="1234 1234 1234 1234" />
        </div>
        <div className="w-1/5 650max:w-full">
          <Label htmlFor="">Expiration</Label>
          <Input type="text" placeholder="MM / YY" />
        </div>
        <div className="w-1/5 650max:w-full">
          <Label htmlFor="">CVC</Label>
          <Input type="text" placeholder="CVC" />
        </div>
      </div>
      <div>
        <Label htmlFor="">Country</Label>
        <Input type="text" placeholder="Country" />
      </div>
      <div className="text-right">
        <Link href="/thank-you">
          <Button className="w-32">Checkout</Button>
        </Link>
      </div>
    </div>
  );
}
