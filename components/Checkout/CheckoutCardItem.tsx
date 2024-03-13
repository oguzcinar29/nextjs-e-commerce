import { Card } from "../ProductsContext/ProductsContext";

export default function CheckoutCardItem(props: Card) {
  return (
    <div className="flex justify-between items-center">
      <div className="w-3/5 flex gap-4 650max:flex-col 650max:w-1/3">
        <div>
          <img className="w-16 h-16" src={props.image} alt={props.title} />
        </div>
        <div className="flex flex-col justify-center 650max:w-1/3 ">
          <b className="650max:hidden">{props.title}</b>
          <span className="650max:hidden">${props.price}</span>
        </div>
      </div>
      <div className="w-1/5 pl-8 650max:w-1/3">
        <span>x{props.count}</span>
      </div>
      <div className="w-1/5 text-end pr-3 650max:w-1/3">
        ${props.count * props.price}
      </div>
    </div>
  );
}
