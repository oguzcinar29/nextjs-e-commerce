import AdminPage from "@/components/admin/Dashboard/AdminPage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Admin() {
  const session = await getServerSession();

  if (session?.user?.name !== "admin") {
    redirect("/");
  }

  return (
    <div>
      <AdminPage />
    </div>
  );
}
