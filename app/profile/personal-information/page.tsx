import PersonalInfo from "@/components/Profile/PersonalInfo";
import UserProfile from "@/components/Profile/UserProfile";

export default function PersonalInformation() {
  return (
    <div className="flex pt-16 pb-5 gap-32 1000max:flex-col 1000max:justify-center 1000max:items-center 1000max:gap-20">
      <UserProfile />
      <PersonalInfo />
    </div>
  );
}
