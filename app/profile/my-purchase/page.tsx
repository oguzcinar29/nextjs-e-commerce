import Purchase from "@/components/Profile/Purchase";
import UserProfile from "@/components/Profile/UserProfile";

export default function MyPurchase() {
  return (
    <div className="flex pt-16 pb-10 gap-32">
      <UserProfile />
      <Purchase />
    </div>
  );
}
