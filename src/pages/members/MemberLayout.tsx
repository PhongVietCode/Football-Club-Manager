import { useGetAllMembersQuery } from "@/api/member";
import { DialogCreateMember, MemberInfoItem } from "@/customComponents";
import { LoadingSpin } from "@/customComponents/LoadingSpin";

export const MemberLayout = () => {
  const {
    data: memberList,
    isLoading: isLoadingMemberList,
    isFetching: isFetchingMemberList,
  } = useGetAllMembersQuery();
  return (
    <div className="flex-1 p-4 flex justify-center">
      {isLoadingMemberList || isFetchingMemberList ? (
        <LoadingSpin useIconAnimation title="Loading All Member List..." />
      ) : (
        // master responsive: flex-1 max-w-[px]
        <div className="flex-1 max-w-[600px] flex flex-col gap-4">
          <div className="flex justify-between">
            <div className="font-montserrat font-semibold text-center text-2xl my-2">
              All Member List
            </div>
            <div>
              <DialogCreateMember playerName={""} />
            </div>
          </div>
          <div className="font-montserrat font-light text-sm text-vRedLight">
            Warn: If admin update member who is registering in not-started
            matches, you should re-split teams of that match.
          </div>
          {memberList?.map((member, index) => (
            <MemberInfoItem member={member} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};
