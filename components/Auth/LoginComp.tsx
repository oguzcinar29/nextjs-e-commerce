import img from "@/public/assets/images/image-1.svg";
import Image from "next/image";
export default function Login() {
  console.log(img.src);

  return (
    <div className="w-full overflow-y-visible">
      <div>
        <div className="w-1/2">
          <img
            style={{ height: "100vh" }}
            src={img.src}
            alt="keyboard desk etc"
          />
        </div>
        <div></div>
      </div>
    </div>
  );
}
