import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
export default function SoryBy() {
  return (
    <div>
      <RadioGroup
        defaultValue="comfortable"
        className="flex flex-col gap-3 pt-5"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="oldest" id="r1" />
          <Label className="text-base font-normal" htmlFor="r1">
            Latest
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="latest" id="r2" />
          <Label className="text-base font-normal" htmlFor="r2">
            Oldest
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
