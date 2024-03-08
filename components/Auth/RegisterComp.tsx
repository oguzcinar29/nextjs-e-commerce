import img from "@/public/assets/images/image-1.svg";
export default function RegisterComp() {
  console.log(img.src);

  return (
    <div>
      <div>
        <div>
          <img src={img.src} alt="keyboard desk etc" />
        </div>
        <div></div>
      </div>
    </div>
  );
}
