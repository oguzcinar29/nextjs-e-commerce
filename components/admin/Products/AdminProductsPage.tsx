"use client";
import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product, User } from "@/components/ProductsContext/ProductsContext";
import { siteURL } from "@/URL";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
export default function AdminUsersPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const getProducts = async () => {
    try {
      const res = await fetch(`${siteURL}/api/products`, {
        cache: "no-cache",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch users");
      } else {
        const data = await res.json();
        setProducts(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const router = useRouter();

  const handleClick = async (id: any) => {
    try {
      const res = await fetch(`${siteURL}/api/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete user");
      } else {
        console.log("success log");
        const data = await res.json();
        setProducts(data.products);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [searchText, setSearchText] = useState<string>("");

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div>
          <SearchBar name="Users" />
        </div>
        <div className="bg-[#19376D] rounded-lg">
          <div className="p-3 flex justify-between">
            <Input
              className="w-1/4 text-black"
              placeholder="Search for a product"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Link href="/admin/products/add">
              <Button className="bg-[#0B2447]">Add new</Button>
            </Link>
          </div>
          <div className="sticky overflow-y-scroll h-[calc(100vh-29vh)]">
            <Table className="overflow-hidden">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[400px]">Title</TableHead>
                  <TableHead className="w-[300px]">Description</TableHead>
                  <TableHead className="w-[100px]">Price</TableHead>
                  <TableHead className="w-[200px]">Category</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="overflow-hidden">
                {products?.map((item: any, i: any) => {
                  if (
                    item.title.toLowerCase().includes(searchText) ||
                    item.title.toUpperCase().includes(searchText)
                  ) {
                    return (
                      <TableRow key={item._id.toString()}>
                        <TableCell className="font-medium">
                          {item.title}
                        </TableCell>
                        <TableCell>
                          {item.description.slice(0, 30)}...
                        </TableCell>
                        <TableCell>$ {item?.price}</TableCell>
                        <TableCell>
                          {" "}
                          {item.category.charAt(0).toUpperCase() +
                            item.category.slice(1)}
                        </TableCell>
                        <TableCell className="flex gap-3">
                          <Link href={`/admin/products/${item._id.toString()}`}>
                            <Button className="bg-green-500">View</Button>
                          </Link>
                          <Button
                            onClick={() => handleClick(item._id.toString())}
                            variant={"destructive"}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
