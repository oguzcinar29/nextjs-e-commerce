import UserProfile from "@/components/Profile/UserProfile";
import { User2Icon } from "lucide-react";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <UserProfile />
    </div>
  );
}
