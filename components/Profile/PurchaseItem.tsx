import { Card } from "../ProductsContext/ProductsContext";

export default function PurchaseItem(props: Card) {
  return (
    <>
      <div className="flex items-center gap-5">
        <div>
          <img
            className="h-20 w-20 min-h-16 min-w-16"
            src={props.image}
            alt={props.title}
          />
        </div>
        <div className="flex flex-col gap-1">
          <b>{props.title}</b>
          <span>${props.count * props.price}</span>
          <span>Purchased On: 11/15/2023</span>
        </div>
      </div>
      <hr />
    </>
  );
}
