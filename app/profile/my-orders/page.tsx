import Orders from "@/components/Profile/Orders";
import UserProfile from "@/components/Profile/UserProfile";

export default function MyOrders() {
  return (
    <div className="flex pt-16 pb-10 gap-32 1000max:flex-col">
      <UserProfile />
      <Orders />
    </div>
  );
}
