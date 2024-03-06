import man from "@/public/category-photos/man.avif";
import woman from "@/public/category-photos/woman.avif";
import jew from "@/public/category-photos/jewelery.avif";
import electronic from "@/public/category-photos/electronics.avif";
import Image from "next/image";
import Link from "next/link";

export default function Category(props: { item: string; id: number }) {
  const photos = [man, jew, electronic, woman];
  console.log(props.id);

  return (
    <div className="flex flex-col gap-3 justify-between w-90 h-90 rounded-md bg-gray-100 pb-3 text-center">
      <Image
        className="object-cover  bg-transparent"
        src={photos[props.id]}
        alt="image"
      />
      <Link className="bg-white w-11/12 m-auto pt-3 pb-3 rounded-md" href="/">
        {props.item.charAt(0).toUpperCase() + props.item.slice(1)}
      </Link>
    </div>
  );
}
