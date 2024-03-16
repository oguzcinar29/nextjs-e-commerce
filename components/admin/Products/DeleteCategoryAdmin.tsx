"use client";

import { Button } from "@/components/ui/button";
import { Delete, MinusCircleIcon, Trash } from "lucide-react";
import React, { useContext, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ProductContext,
  productContextType,
} from "@/components/ProductsContext/ProductsContext";
import { siteURL } from "@/URL";
import { useRouter } from "next/navigation";

export default function DeleteCategoryAdmin() {
  const [isClicked, setClicked] = useState<boolean>(false);

  const { categories, setCategories } =
    useContext<productContextType>(ProductContext);

  const router = useRouter();

  const deleteCategory = async (id: any) => {
    try {
      const res = await fetch(`${siteURL}/api/categories/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete category");
      } else {
        const data = await res.json();
        setCategories(data.categories);
        router.refresh();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex gap-1 items-center" variant="destructive">
            <MinusCircleIcon />
            <span>Delete Category</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Categories</DialogTitle>
          </DialogHeader>
          <div className="sticky overflow-y-scroll flex flex-col gap-3 h-[calc(100vh-20vh)]">
            {categories?.map((item: any) => {
              return (
                <div
                  className="flex justify-between items-center "
                  key={item._id}
                >
                  <span>{item.name}</span>
                  <Button
                    onClick={() => deleteCategory(item._id)}
                    size={"sm"}
                    variant="destructive"
                  >
                    <Trash />
                  </Button>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
