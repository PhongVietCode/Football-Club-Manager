import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRef, useState } from "react";
import { SelectorNumber } from "./SelectorNumber";
import { InputWithLabel } from "./InputWithLabel";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useRegisterMutation } from "@/api/member";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
type DialogCreateMemberProps = {
  open?: boolean;
  setOpen?: setState<boolean>;
  playerName: string;
  refetch?: (member?: MemberResponse) => void;
};
export const DialogCreateMember = (props: DialogCreateMemberProps) => {
  const { open, playerName, setOpen, refetch } = props;
  const [fullName, setFullName] = useState(playerName);
  const [choosenElo, setChoosenElo] = useState("5");
  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  function submit() {
    register({
      fullName: fullName,
      password: "123456",
      elo: parseFloat(choosenElo),
    })
      .unwrap()
      .then((result) => {
        setFullName("");
        if (refetch) refetch(result);
      });
  }
  return (
    <Dialog open={open}>
      <DialogTrigger className="bg-vRedBold text-white hover:bg-vRedLight p-2 font-palanquin font-semibold rounded-lg">
        Create New Member
      </DialogTrigger>
      <DialogContent ref={dialogRef}>
        <DialogHeader>
          <DialogTitle>Create New Player</DialogTitle>
          <DialogDescription></DialogDescription>
          <div className="flex flex-row items-center gap-4">
            <div className="flex-1">
              <InputWithLabel
                label="Name: "
                value={fullName}
                setValue={setFullName}
                // onEnter={submit}
              />
            </div>
            <div className="flex-[0.3]">
              <SelectorNumber
                label="Elo:"
                arrayItem={Array.from(Array(11).keys())}
                placeHolderName="MemberElo"
                value={choosenElo}
                setValue={setChoosenElo}
              />
            </div>
          </div>
        </DialogHeader>
        <div className="flex justify-end">
          {setOpen && (
            <Button
              onClick={() => setOpen && setOpen(false)}
              className="bg-transparent hover:bg-vRedBold text-vRedBold hover:text-white border-[2px] border-vRedBold"
            >
              Close
            </Button>
          )}
          {isRegistering ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            <Button onClick={submit} className="bg-vRedBold hover:bg-vRedLight">
              Create
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
