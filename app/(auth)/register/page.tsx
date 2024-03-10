import RegisterComp from "@/components/Auth/RegisterComp";
import img from "@/public/assets/images/image-1.svg";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function Register() {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }
  return (
    <div>
      <RegisterComp />
    </div>
  );
}
