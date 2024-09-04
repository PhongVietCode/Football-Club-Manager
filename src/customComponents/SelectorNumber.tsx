import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
type SelectorProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeHolderName: string;
  arrayItem: number[];
  label?: string;
  textStyle?: string;
};
export const SelectorNumber = (props: SelectorProps) => {
  const { value, setValue, placeHolderName, arrayItem, label, textStyle } =
    props;
  return (
    <div className="flex flex-col items-center">
      {label && (
        <div className={`text-black font-palanquin font-semibold ${textStyle}`}>
          {label}
        </div>
      )}
      <Select
        onValueChange={(value) => {
          setValue(value);
        }}
        value={value}
      >
        <SelectTrigger className="max-w-28">
          <SelectValue className="text-red-300" placeholder={placeHolderName} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {arrayItem.map((item, index) => {
              return (
                <SelectItem key={index} value={item.toString()}>
                  {item}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
