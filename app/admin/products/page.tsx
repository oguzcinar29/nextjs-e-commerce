import AdminProductsPage from "@/components/admin/Products/AdminProductsPage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdminProducts() {
  const session = await getServerSession();

  if (session?.user?.name !== "admin") {
    redirect("/");
  }
  return (
    <div>
      <AdminProductsPage />
    </div>
  );
}
