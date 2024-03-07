import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useContext, useState } from "react";
import {
  ProductContext,
  productContextType,
} from "../ProductsContext/ProductsContext";

export default function CategoriesButtons() {
  const { pickCategory, setPickCategory, categories } =
    useContext<productContextType>(ProductContext);

  return (
    <div className="pt-5">
      <RadioGroup defaultValue={pickCategory}>
        <div className="flex gap-3 items-center text-2xl">
          <RadioGroupItem
            onClick={() => setPickCategory("all")}
            value="all"
            id="all"
          />
          <Label className="text-base font-normal" htmlFor="all">
            All
          </Label>
        </div>
        <div className="flex  flex-col  gap-3">
          {categories?.map((item: string, id: any) => {
            return (
              <div key={id} className="flex gap-3 items-center text-2xl">
                <RadioGroupItem
                  onClick={() => setPickCategory(item)}
                  value={item}
                  id={id}
                />
                <Label className="text-base font-normal" htmlFor={id}>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Label>
              </div>
            );
          })}
        </div>
      </RadioGroup>
    </div>
  );
}
