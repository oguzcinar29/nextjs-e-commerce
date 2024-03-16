import { LucideUsers } from "lucide-react";
export default function ThreeBox() {
  return (
    <div className="flex gap-6 justify-between">
      <div className="flex gap-5 rounded-lg p-7 w-1/3  bg-[#19376D]">
        <span>
          {" "}
          <LucideUsers />
        </span>
        <div className="flex flex-col gap-5">
          <span>Total Users</span>
          <b className="text-2xl">10.324</b>
          <span>
            <span className="text-green-500">12%</span> more than previous week
          </span>
        </div>
      </div>
      <div className="flex gap-5 rounded-lg p-7  w-1/3 bg-[#19376D]">
        <span>
          <LucideUsers />
        </span>
        <div className="flex flex-col gap-5">
          <span>Stock</span>
          <b className="text-2xl">8.623</b>
          <span>
            <span className="text-red-600">-2%</span> less than previous week
          </span>
        </div>
      </div>
      <div className="flex gap-5 rounded-lg p-7  w-1/3 bg-[#19376D]">
        <span>
          <LucideUsers />
        </span>
        <div className="flex flex-col gap-5">
          <span>Revenue</span>
          <b className="text-2xl">10.324</b>
          <span>
            <span className="text-green-500">18%</span> more than previous week
          </span>
        </div>
      </div>
    </div>
  );
}
