import {
  CircleDollarSign,
  Facebook,
  Headset,
  Instagram,
  Package,
  Twitter,
  WalletCardsIcon,
} from "lucide-react";
import logo from "@/public/logo-white.svg";
export default function Footer() {
  return (
    <div className="pt-32">
      <div className="w-3/4 m-auto flex justify-between gap-5 pb-16 flex-wrap ">
        <div className="flex flex-col gap-2">
          <Package size={30} />
          <b className="text-lg pt-3">Free Shipping</b>
          <p className="text-base text-gray-500">
            Free shipping for order above $150
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <CircleDollarSign size={30} />
          <b className="text-lg pt-3">Money Guarentee</b>
          <p className="text-base text-gray-500">
            Within 30 days for an exchange
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Headset size={30} />
          <b className="text-lg pt-3">Online Support</b>
          <p className="text-base text-gray-500">
            24 hours a day, 7 days a week
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <WalletCardsIcon size={30} />
          <b className="text-lg pt-3">Flexible Payment</b>
          <p className="text-base text-gray-500">
            Pay with multiple credit cards
          </p>
        </div>
      </div>
      <div className="bg-black pt-10 pb-10 ">
        <div className=" text-white flex-wrap 1000max:gap-5 1000max:justify-center  flex justify-between items-center w-3/4 m-auto  ">
          <div>
            <img className="text-white" src={logo.src} alt="logo" />
          </div>
          <div>
            <span className="font-light">
              &copy;{new Date().getFullYear()} Tech Heaven. All Rights are
              reserved
            </span>
          </div>
          <div className="cursor-pointer flex gap-10">
            <Facebook />
            <Instagram />
            <Twitter />
          </div>
        </div>
      </div>
    </div>
  );
}
