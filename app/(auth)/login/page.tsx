import LoginComp from "@/components/Auth/LoginComp";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return (
    <div>
      <LoginComp />
    </div>
  );
}
