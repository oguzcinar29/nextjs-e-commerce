import SearchBar from "@/components/admin/SearchBar/SearchBar";
import AddNewUserAdmin from "@/components/admin/Users/AddNewUserAdmin";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function UserAddAdmin() {
  const session = await getServerSession();

  if (session?.user?.name !== "admin") {
    redirect("/");
  }
  return (
    <div className="flex flex-col gap-5">
      <div>
        <SearchBar name="Add" />
      </div>
      <AddNewUserAdmin />
    </div>
  );
}
