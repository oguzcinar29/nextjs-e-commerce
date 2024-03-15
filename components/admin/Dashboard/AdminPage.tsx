import LeftMenu from "../LeftMenu/LeftMenu";
import SearchBar from "../SearchBar/SearchBar";
import UserInfo from "./UserInfo";

export default function AdminPage() {
  return (
    <div className="sticky overflow-y-scroll h-[calc(100vh-7vh)]">
      <div className="flex flex-col gap-7">
        <div>
          <SearchBar name="Dashboard" />
        </div>
        <div>
          <UserInfo />
          <div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
