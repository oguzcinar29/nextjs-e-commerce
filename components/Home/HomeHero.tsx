import Image from "next/image";
import Link from "next/link";

import hero1 from "@/public/admin ui/hero/hero-1.png";
export default function HomeHero() {
  return (
    <div className="bg-gray-200 relative text-center">
      <Image src={hero1} alt="hero img" />
      <div className="absolute top-2/4 left-1/4 text-start transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-10 w-2/5">
        <h1 className="font-extrabold text-5xl 1000max:text-2xl 750max:hidden  ">
          Unleash Innovation in Every Byte.
        </h1>
        <h3 className="font-normal text-2xl 1000max:text-lg 550max:hidden">
          Explore a World of Cutting-Edge Tech
        </h3>
        <Link
          className="bg-black p-3 w-32 text-white rounded-lg text-center 550max:hidden"
          href="/shop"
        >
          Shop now
        </Link>
      </div>
    </div>
  );
}
