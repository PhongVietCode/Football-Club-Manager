import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableLocation,
} from "@hello-pangea/dnd";
import { FaArrowRightLong } from "react-icons/fa6";
type DragAndDropProps = {
  player_teams: MemberResponse[][];
  setPlayerTeams: (teams: MemberResponse[][]) => void;
  supportClick?: boolean;
  teamInfo?: TeamSplitResponse[];
  draggable?: boolean;
};

const reorder = (list: MemberResponse[], startInd: number, endInd: number) => {
  const listArray = Array.from(list);
  const [remove] = listArray.splice(startInd, 1);
  // add removed item at end index of array
  listArray.splice(endInd, 0, remove);
  return listArray;
};
const move = (
  source: MemberResponse[],
  destination: MemberResponse[],
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);

  const result: MemberResponse[][] = [];
  result[+droppableSource.droppableId] = sourceClone;
  result[+droppableDestination.droppableId] = destClone;
  return result;
};

export const DragAndDrop = (props: DragAndDropProps) => {
  const { player_teams, setPlayerTeams, supportClick, teamInfo, draggable } =
    props;
  function onDragEnd(result: DropResult) {
    if (draggable == false) return;
    const { source, destination } = result;

    console.log(source.index, destination?.index);
    if (destination == null) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;
    if (sInd == dInd) {
      const result = reorder(
        player_teams[sInd],
        source.index,
        destination.index
      );
      const newTeams = [...player_teams];
      newTeams[sInd] = result;
      setPlayerTeams(newTeams);
    } else {
      const result = move(
        player_teams[sInd],
        player_teams[dInd],
        source,
        destination
      );
      const newTeams = [...player_teams];
      newTeams[sInd] = result[sInd];
      newTeams[dInd] = result[dInd];
      setPlayerTeams(newTeams);
    }
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {player_teams.map((team, index) => (
        <Droppable key={index} droppableId={`${index}`}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              className={`flex-1 px-2 py-1 min-w-[300px] max-h-[500px] overflow-y-scroll rounded-lg  ${
                snapshot.isDraggingOver ? "bg-white/10" : "bg-white/5"
              }`}
              {...provided.droppableProps}
            >
              {team.map((player, index) => (
                <Draggable
                  key={player.id}
                  draggableId={player.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`select-none`}
                      style={{
                        ...provided.draggableProps.style,
                      }}
                    >
                      <div
                        className="w-full px-4 py-4 rounded-md my-1 flex flex-row justify-between items-center border-[1px]  border-black/20 dark:border-white/20"
                        style={{
                          backgroundColor: snapshot.isDragging
                            ? "#A91D3A"
                            : "transparent",
                        }}
                      >
                        <span
                          className={`${snapshot.isDragging && "text-white"}`}
                        >
                          {" "}
                          {player.fullName}
                        </span>
                        <div className="flex flex-row gap-3 items-center">
                          <span
                            className={`${snapshot.isDragging && "text-white"}`}
                          >
                            {" "}
                            {player.elo}
                          </span>
                          {supportClick &&
                            (player_teams.indexOf(team) !=
                            player_teams.length - 1 ? (
                              <div
                                onClick={() => {
                                  const indexOfTeam =
                                    player_teams.indexOf(team);
                                  const newTeams = [...player_teams];
                                  const result: MemberResponse[][] = [];
                                  result[indexOfTeam] = Array.from(newTeams[0]);
                                  result[indexOfTeam + 1] = Array.from(
                                    newTeams[1]
                                  );
                                  const [removed] = result[0].splice(index, 1);
                                  result[1].splice(0, 0, removed);
                                  setPlayerTeams(result);
                                }}
                                className="px-3 py-1 bg-white/5 rounded-lg hover:bg-vRedBold cursor-pointer"
                              >
                                <FaArrowRightLong size={22} />
                              </div>
                            ) : (
                              <div
                                onClick={() => {
                                  const indexOfTeam = player_teams.length - 1;
                                  const newTeams = [...player_teams];
                                  const result: MemberResponse[][] = [];
                                  result[indexOfTeam] = Array.from(
                                    newTeams[indexOfTeam]
                                  );
                                  result[indexOfTeam - 1] = Array.from(
                                    newTeams[indexOfTeam - 1]
                                  );
                                  const [removed] = result[indexOfTeam].splice(
                                    index,
                                    1
                                  );
                                  result[indexOfTeam - 1].splice(0, 0, removed);
                                  setPlayerTeams(result);
                                }}
                                className="px-3 py-1 bg-white/5 rounded-lg hover:bg-vRedBold cursor-pointer"
                              >
                                <FaArrowRightLong
                                  size={22}
                                  className="rotate-180"
                                />
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              {teamInfo != undefined && (
                <div className=" flex justify-between p-2">
                  <div className="font-palanquin font-semibold text-black dark:text-white">
                    Color : <span>{teamInfo[index].teamColor}</span>
                  </div>
                  <div>
                    TotalElo: <span>{teamInfo[index].totalElo}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </Droppable>
      ))}
    </DragDropContext>
  );
};
