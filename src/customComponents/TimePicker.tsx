import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ControllerRenderProps } from "react-hook-form";
type TimePickerProps = {
  field: ControllerRenderProps<
    {
      eventHour: string;
      fieldAdress: string;
      eventDate: Date;
      eventMinute: string;
    },
    "eventHour" | "eventMinute"
  >;
  arrayItem: number[];
};
export const TimePicker = (props: TimePickerProps) => {
  const { field, arrayItem } = props;
  return (
    <div className="flex flex-row gap-2 items-center text-black dark:text-white">
      <Select onValueChange={field.onChange} value={field.value}>
        <SelectTrigger className="dark:bg-vBlackLight max-w-24">
          <SelectValue className="" placeholder="Hour" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Array.from(arrayItem.keys()).map((item) => {
              return <SelectItem value={item.toString()}>{item}</SelectItem>;
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
