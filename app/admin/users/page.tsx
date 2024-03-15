import AdminUsersPage from "@/components/admin/Users/AdminUsersPage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdminUsers() {
  const session = await getServerSession();

  if (session?.user?.name !== "admin") {
    redirect("/");
  }
  return (
    <div>
      <AdminUsersPage />
    </div>
  );
}
