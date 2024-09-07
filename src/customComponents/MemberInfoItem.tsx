import {
  useUpdateMemberEloMutation,
  useUpdateMemberInfoMutation,
} from "@/api/member";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { LoadingSpin } from "./LoadingSpin";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { SelectorNumber } from "./SelectorNumber";
type MemberInfoItemProps = {
  member: MemberResponse;
};

export const MemberInfoItem = ({ member }: MemberInfoItemProps) => {
  const [fullName, setFullName] = useState(member.fullName);
  const [elo, setElo] = useState(member.elo?.toString() || "");

  const user = useSelector((state: RootState) => state.user);
  const [updateMemberElo, { isLoading: isUpdatingMemberElo }] =
    useUpdateMemberEloMutation();
  const [updateMemberFullNamme, { isLoading: isUpdatingMemberFullName }] =
    useUpdateMemberInfoMutation();
  const handleSubmit = () => {
    if (user.role == "GOLDEN_KEY") {
      updateMemberElo({
        id: member.id,
        elo: elo != undefined ? parseInt(elo) : undefined,
      });
    }
    updateMemberFullNamme({ fullName: fullName, id: member.id });
  };
  return (
    <div className="flex-1 flex">
      <Dialog>
        <DialogTrigger className="flex-1">
          <div className="w-full flex justify-between border-[1px] hover:-translate-y-2 hover:text-white hover:bg-vRedLight overflow-hidden rounded-md border-black dark:border-white p-4 transition-transform">
            <div>{member.fullName}</div>
            <div>{member.elo}</div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Member Profile</DialogTitle>
            <DialogDescription>
              Change member login name or update elo.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center gap-4">
            <div className="flex-1 flex flex-col gap-3">
              <Label htmlFor="name">Full name:</Label>
              <Input
                id="name"
                value={fullName}
                onChange={(value) => setFullName(value.target.value)}
              />
            </div>
            <div className="flex-[0.3]">
              <SelectorNumber
                label="Elo:"
                arrayItem={Array.from(Array(11).keys())}
                placeHolderName="MemberElo"
                value={elo}
                setValue={setElo}
              />
            </div>
          </div>
          <div className="flex-1 flex flex-row justify-between">
            <DialogClose className="justify-self-start hover:bg-black/5 bg-black/10 px-4 rounded-md">
              Close
            </DialogClose>
            {isUpdatingMemberElo || isUpdatingMemberFullName ? (
              <LoadingSpin />
            ) : (
              <Button type="submit" onClick={handleSubmit}>
                Save changes
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
