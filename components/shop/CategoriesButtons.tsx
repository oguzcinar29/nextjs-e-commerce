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
          {categories?.map((item: any, id: any) => {
            return (
              <div key={id} className="flex gap-3 items-center text-2xl">
                <RadioGroupItem
                  onClick={() => setPickCategory(item?.name)}
                  value={item?.name}
                  id={id}
                />
                <Label className="text-base font-normal" htmlFor={id}>
                  {item &&
                    item?.name?.charAt(0).toUpperCase() + item?.name?.slice(1)}
                </Label>
              </div>
            );
          })}
        </div>
      </RadioGroup>
    </div>
  );
}
