import AddNewProductAdmin from "@/components/admin/Products/AddNewProductAdmin";
import SearchBar from "@/components/admin/SearchBar/SearchBar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProductsAdd() {
  const session = await getServerSession();

  if (session?.user?.name !== "admin") {
    redirect("/");
  }
  return (
    <div className="flex flex-col gap-5">
      <div>
        <SearchBar name="Add" />
      </div>
      <AddNewProductAdmin />
    </div>
  );
}
