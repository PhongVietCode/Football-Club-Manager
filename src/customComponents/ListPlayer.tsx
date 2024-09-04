import { Separator } from "@/components/ui/separator";

type ListPlayerProps = {
  players: MemberResponse[];
};
export const ListPlayer = (props: ListPlayerProps) => {
  const { players } = props;
  return (
    <div>
      {players.map((player, index) => (
        <div key={index}>
          <div key={player.id} className="flex justify-between">
            <span>{player.fullName}</span>
            <span>{player.elo}</span>
          </div>
          {index != players.length - 1 && <Separator className="dark:bg-white/40 my-2" />}
        </div>
      ))}
    </div>
  );
};
