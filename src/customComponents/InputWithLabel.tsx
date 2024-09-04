import { Input } from "@/components/ui/input";
type InputWithLabelProps = {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onEnter?: () => void;
};
export const InputWithLabel = (props: InputWithLabelProps) => {
  const { label, value, setValue, onEnter } = props;
  return (
    <div>
      <div className="text-black font-palanquin font-semibold">{label}</div>
      <Input
        placeholder="Player Name"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        onKeyDown={(event) => {
          if (event.code == "Enter" && onEnter != undefined) {
            onEnter;
          }
        }}
      />
    </div>
  );
};
