"use client";
import { siteURL } from "@/URL";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useContext, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ProductContext,
  productContextType,
} from "@/components/ProductsContext/ProductsContext";
import { PlusCircle } from "lucide-react";
import DeleteCategoryAdmin from "./DeleteCategoryAdmin";
import { toast } from "sonner";

export default function AddNewProductAdmin(props: { id: string }) {
  const { products, setProducts, categories, setCategories } =
    useContext<productContextType>(ProductContext);

  const findProduct = products?.find((item: any) => item._id === props.id);
  const [newCategory, setNewCategory] = useState<string>("");

  const [image, setImage] = useState<string>(findProduct?.image || "");
  const [img, setImg] = useState<File | string>(findProduct?.image || "");

  const [title, setTitle] = useState<string>(findProduct?.title || "");
  const [description, setDescription] = useState<string>(
    findProduct?.description || ""
  );
  const [category, setCategory] = useState<string>(findProduct?.category || "");
  const [price, setPrice] = useState<string>(
    findProduct?.price.toString() || ""
  );

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setImg(event.target.files[0]);
    }
  };

  const router = useRouter();

  const [err, setError] = useState<string>("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = new FormData();

    data.set("picture", img);
    data.append("title", title);
    data.append("description", description);
    data.append("category", category);
    data.append("price", price.toString());

    try {
      const res = await fetch(`${siteURL}/api/products/${props.id}`, {
        method: "PUT",
        body: data,
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message);
      } else {
        const data = await res.json();
        setProducts(data.products);
        router.push("/admin/products");
        router.refresh();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const [isCategoryClicked, setCategoryClicked] = useState<boolean>(false);
  const addCategory = async (e: any) => {
    setError("");

    setCategoryClicked(false);
    e.preventDefault();
    try {
      const res = await fetch(`${siteURL}/api/categories`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ newCategory }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data?.message);
      } else {
        toast("Category added", {
          action: {
            label: "Ok",
            onClick: () => console.log("Undo"),
          },
        });
        const data = await res.json();
        setCategories(data.categories2);
        router.refresh();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {err && (
        <div>
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{err}</AlertDescription>
          </Alert>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex gap-10 ">
        <div className="bg-[#19376D] p-5 rounded-lg w-1/3 flex flex-col gap-10">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Picture</Label>
            <Input
              name="picture"
              onChange={onImageChange}
              id="picture"
              type="file"
            />
          </div>
          <div>
            {image && (
              <img
                className="w-full h-60 object-cover"
                src={image}
                alt="image"
              />
            )}
          </div>
        </div>
        <div className="w-2/3 bg-[#19376D] p-5 rounded-lg flex flex-col gap-3">
          <div>
            <Label>Title</Label>
            <Input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="text-black"
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="text-black"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <Label>Category</Label>
              <Select
                defaultValue={findProduct?.category}
                onValueChange={(e) => setCategory(e)}
              >
                <SelectTrigger className="w-full text-black ">
                  <SelectValue
                    defaultValue={findProduct?.category}
                    className="text-black"
                    placeholder="Select a category"
                  />
                </SelectTrigger>
                <SelectContent className="text-black">
                  <SelectGroup className="text-black">
                    <SelectLabel>Categories</SelectLabel>

                    {categories?.map((item: any) => {
                      return (
                        <SelectItem key={item._id} value={item.name}>
                          {item.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-5">
              {!isCategoryClicked && (
                <Button
                  className="flex gap-1 items-center"
                  onClick={() => setCategoryClicked(!isCategoryClicked)}
                >
                  <PlusCircle />
                  <span>Add Category</span>
                </Button>
              )}
              {!isCategoryClicked && <DeleteCategoryAdmin />}
              {isCategoryClicked && (
                <div className="flex gap-5 items-center w-full">
                  <Input
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Type category..."
                    className="text-black w-full"
                    required
                  />
                  <Button onClick={addCategory}>Submit</Button>
                  <Button onClick={() => setCategoryClicked(false)}>
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div>
            <Label>Price</Label>
            <Input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className="text-black"
            />
          </div>
          <Button type="submit">Update</Button>
        </div>
      </form>
    </div>
  );
}
