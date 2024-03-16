import {
  ProductContext,
  productContextType,
} from "@/components/ProductsContext/ProductsContext";
import EditProductAdminPage from "@/components/admin/Products/EditProductAdminPage";
import SearchBar from "@/components/admin/SearchBar/SearchBar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { useContext } from "react";

export default async function ProductsEdit({ params }: any) {
  const session = await getServerSession();

  const { id } = params;

  if (session?.user?.name !== "admin") {
    redirect("/");
  }
  return (
    <div className="flex flex-col gap-5">
      <div>
        <SearchBar name={id} />
      </div>

      <EditProductAdminPage id={id} />
    </div>
  );
}
