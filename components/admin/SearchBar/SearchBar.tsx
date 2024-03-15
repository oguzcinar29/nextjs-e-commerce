import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BellRing,
  Earth,
  MailIcon,
  MessageSquareTextIcon,
  Search,
} from "lucide-react";

export default function SearchBar(props: { name: string }) {
  return (
    <div className="bg-[#19376D] p-5 rounded-lg">
      <div className="flex justify-between items-center">
        <h1>{props.name}</h1>
        <div className="flex gap-5 items-center">
          <Label
            htmlFor="email"
            className="relative text-gray-400 focus-within:text-gray-600 block"
          >
            <Search className="pointer-events-none w-6 h-6 text-white absolute top-1/2 transform -translate-y-1/2 left-3" />
            <Input
              className="bg-transparent pl-10 text-white"
              id="email"
              placeholder="Search..."
            />
          </Label>

          <MessageSquareTextIcon size={22} />
          <BellRing size={22} fill="white" />
          <Earth size={22} color="white" />
        </div>
      </div>
    </div>
  );
}
