import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  GitGraphIcon,
  HelpCircle,
  LayoutDashboardIcon,
  LogOutIcon,
  Settings,
  ShoppingBagIcon,
  Users,
  Users2,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function LeftMenu() {
  return (
    <div className="bg-[#19376D] w-1/4 p-5 sticky overflow-y-scroll h-screen ">
      <div className="flex gap-5 flex-col">
        <div className="flex gap-3">
          <div>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col ">
            <b>admin</b>
            <span>Administrator</span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <span>Pages</span>
          <div className=" flex flex-col gap-3">
            <Link href="/admin">
              <Button
                className="flex  items-center gap-2 w-full justify-start"
                variant={"ghost"}
              >
                <span>
                  <LayoutDashboardIcon />
                </span>
                <span>Dashboard</span>
              </Button>
            </Link>
            <Link href="/admin/users">
              <Button
                className="flex  items-center gap-2 w-full justify-start"
                variant={"ghost"}
              >
                <span>
                  <Users />
                </span>
                <span>Users</span>
              </Button>
            </Link>
            <Link href="/admin/products">
              <Button
                className="flex  items-center gap-2 w-full justify-start"
                variant={"ghost"}
              >
                <span>
                  <ShoppingBagIcon />
                </span>
                <span>Products</span>
              </Button>
            </Link>
            <Link href="/admin">
              <Button
                className="flex  items-center gap-2 w-full bg-transparent justify-start"
                variant={"ghost"}
              >
                <span>
                  <DollarSign />
                </span>
                <span>Transactions</span>
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <span>Analytics</span>
          <div className=" flex flex-col gap-3">
            <Link href="/admin">
              <Button
                className="flex  items-center gap-2 w-full justify-start"
                variant={"ghost"}
              >
                <span>
                  <ShoppingBagIcon />
                </span>
                <span>Revenue</span>
              </Button>
            </Link>
            <Link href="/admin/users">
              <Button
                className="flex  items-center gap-2 w-full justify-start"
                variant={"ghost"}
              >
                <span>
                  <GitGraphIcon />
                </span>
                <span>Reports</span>
              </Button>
            </Link>
            <Link href="/admin/products">
              <Button
                className="flex  items-center gap-2 w-full justify-start"
                variant={"ghost"}
              >
                <span>
                  <Users2 />
                </span>
                <span>Teams</span>
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <span>User</span>
          <div className=" flex flex-col gap-3">
            <Link href="/admin">
              <Button
                className="flex  items-center gap-2 w-full justify-start"
                variant={"ghost"}
              >
                <span>
                  <Settings />
                </span>
                <span>Settings</span>
              </Button>
            </Link>
            <Link href="/admin">
              <Button
                className="flex  items-center gap-2 w-full justify-start"
                variant={"ghost"}
              >
                <span>
                  <HelpCircle />
                </span>
                <span>Help</span>
              </Button>
            </Link>
            <Link href="/">
              <Button
                className="flex  items-center gap-2 w-full justify-start"
                variant={"ghost"}
              >
                <span>
                  <LogOutIcon />
                </span>
                <span>Logout</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
