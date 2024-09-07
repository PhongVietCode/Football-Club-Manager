import { handleResponse } from "@/common/handleResponse";
import { api } from ".";
import { handleErrorResponse } from "@/common/handleErrorResponse";

export const memberApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getAllMembers: build.query<MemberResponse[], void>({
      query: () => "/members/list",
      transformResponse: (response: ApiResponse<MemberResponse[]>) => {
        return handleResponse<MemberResponse[]>(response);
      },
      transformErrorResponse: (response: ErrorApiResponse) => {
        return handleErrorResponse(response);
      },
      // providesTags: ["Members"],
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Members' as const, id })), 'Members']
          : ['Members'],
    }),
    getInfo: build.query<MemberResponse, void>({
      query: () => "/members/info",
      transformResponse: (response: ApiResponse<MemberResponse>) => {
        return handleResponse<MemberResponse>(response);
      },
      transformErrorResponse: (response: ErrorApiResponse) => {
        return handleErrorResponse(response);
      },
    }),
    register: build.mutation<MemberResponse, RegisterFormRequest>({
      query: (data) => ({
        url: "/members",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: ApiResponse<MemberResponse>) => {
        return handleResponse<MemberResponse>(response);
      },
      transformErrorResponse: (response: ErrorApiResponse) => {
        return handleErrorResponse(response);
      },
      invalidatesTags: ["Members"],
    }),
    updateMemberElo: build.mutation<MemberResponse, MemberUpdateEloRequest>({
      query: (data) => ({
        url: "/members/elo",
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: ApiResponse<MemberResponse>) => {
        return handleResponse<MemberResponse>(response);
      },
      transformErrorResponse: (response: ErrorApiResponse) => {
        return handleErrorResponse(response);
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Members', id: arg.id }],
    }),
    updateMemberInfo: build.mutation<MemberResponse, MemberUpdateInfoRequest>({
      query: (data) => ({
        url: "/members/info",
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: ApiResponse<MemberResponse>) => {
        return handleResponse<MemberResponse>(response);
      },
      transformErrorResponse: (response: ErrorApiResponse) => {
        return handleErrorResponse(response);
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Members', id: arg.id }],
    }),
    updateMemberRole: build.mutation<MemberResponse, MemberUpdateRoleRequest>({
      query: (data) => ({
        url: "/members/role",
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: ApiResponse<MemberResponse>) => {
        return handleResponse<MemberResponse>(response);
      },
      transformErrorResponse: (response: ErrorApiResponse) => {
        return handleErrorResponse(response);
      },
    }),
  }),
});
export const {
  useRegisterMutation,
  useGetInfoQuery,
  useLazyGetInfoQuery,
  useUpdateMemberEloMutation,
  useUpdateMemberInfoMutation,
  useUpdateMemberRoleMutation,
  useGetAllMembersQuery,
} = memberApi;
