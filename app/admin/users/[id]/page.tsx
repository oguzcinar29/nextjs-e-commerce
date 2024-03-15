import UsersChangeInfoAdmin from "@/components/admin/Users/UsersChangeInfoAdmin";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function UserInfo({ params }: any) {
  const session = await getServerSession();

  if (session?.user?.name !== "admin") {
    redirect("/");
  }
  const { id } = params;
  return (
    <div>
      <UsersChangeInfoAdmin id={id} />
    </div>
  );
}
