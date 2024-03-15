import LatestTransactions from "./LatestTransactions";
import ThreeBox from "./ThreeBox";

export default function UserInfo() {
  return (
    <div className="flex flex-col gap-10">
      <ThreeBox />
      <LatestTransactions />
      <div></div>
    </div>
  );
}
