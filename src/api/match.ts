import { handleResponse } from "@/common/handleResponse";
import { api } from ".";
import { handleErrorResponse } from "@/common/handleErrorResponse";

export const matchApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getMemberListInMatch: build.query<
      ListMemberMatchResponse,
      { matchId: number }
    >({
      query: (data) => `/matches/${data.matchId}/register/list`,
      transformResponse: (response: ApiResponse<ListMemberMatchResponse>) => {
        return handleResponse<ListMemberMatchResponse>(response);
      },
      transformErrorResponse: (response: ErrorApiResponse) => {
        return handleErrorResponse(response);
      },
    }),

    registerMemberListInMatch: build.mutation<
      string,
      { players: MemberResponse[]; matchId: number }
    >({
      query: (data) => ({
        url: `/matches/${data.matchId}/register/list`,
        method: "POST",
        body: {
          players: data.players,
        },
      }),
      transformResponse: (response: ApiResponse<string>) => {
        return handleResponse<string>(response);
      },
      transformErrorResponse: (response: ErrorApiResponse) => {
        return handleErrorResponse(response);
      },
    }),

    getMatchInfo: build.query<MatchInfoResponse, { matchId: number }>({
      query: (data) => ({
        url: `/matches/${data.matchId}/info`,
      }),
      transformResponse: (response: ApiResponse<MatchInfoResponse>) => {
        return handleResponse<MatchInfoResponse>(response);
      },
      transformErrorResponse: (response: ErrorApiResponse) => {
        return handleErrorResponse(response);
      },
    }),
    getMatchList: build.query<MatchInfoItemResponse[], void>({
      query: () => `/matches`,
      transformResponse: (response: ApiResponse<MatchInfoItemResponse[]>) => {
        return handleResponse<MatchInfoItemResponse[]>(response);
      },
      transformErrorResponse: (response: ErrorApiResponse) => {
        return handleErrorResponse(response);
      },
      providesTags: ["Matches"],
    }),
    createMatch: build.mutation<MatchResponse, MatchCreateRequest>({
      query: (data) => ({
        url: "/matches",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Matches"],
      transformResponse: (response: ApiResponse<MatchResponse>) => {
        return handleResponse<MatchResponse>(response);
      },
      transformErrorResponse: (response: ErrorApiResponse) => {
        return handleErrorResponse(response);
      },
    }),
    updateMatch: build.mutation<
      MatchResponse,
      MatchUpdateRequest & { matchId: string }
    >({
      query: (data) => ({
        url: `/matches/${data.matchId}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: ApiResponse<MatchResponse>) => {
        return handleResponse<MatchResponse>(response);
      },
      transformErrorResponse: (response: ErrorApiResponse) => {
        return handleErrorResponse(response);
      },
    }),
    deleteMatch: build.mutation<string, { matchId: number }>({
      query: (data) => ({
        url: `/matches/${data.matchId}`,
        method: "DELETE",
      }),
      transformResponse: (response: ApiResponse<string>) => {
        return handleResponse<string>(response);
      },
      transformErrorResponse: (response: ErrorApiResponse) => {
        return handleErrorResponse(response);
      },
    }),
    registerMatch: build.mutation<MatchResponse, MatchRegisterRequest>({
      query: (data) => ({
        url: "/matches/register",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: ApiResponse<MatchResponse>) => {
        return handleResponse<MatchResponse>(response);
      },
      transformErrorResponse: (response: ErrorApiResponse) => {
        return handleErrorResponse(response);
      },
    }),
    unRegisterMatch: build.mutation<MatchResponse, MatchRegisterRequest>({
      query: (data) => ({
        url: "/matches/unregister",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: ApiResponse<MatchResponse>) => {
        return handleResponse<MatchResponse>(response);
      },
      transformErrorResponse: (response: ErrorApiResponse) => {
        return handleErrorResponse(response);
      },
    }),
    updateSubMatches: build.mutation<
      string,
      { matchId: number; subMatches: string[] }
    >({
      query: (data) => ({
        url: `/matches/${data.matchId}/submatch`,
        method: "PATCH",
        body: {
          subMatches: data.subMatches,
        },
      }),
      transformResponse: (response: ApiResponse<string>) => {
        return handleResponse<string>(response);
      },
      transformErrorResponse: (response: ErrorApiResponse) => {
        return handleErrorResponse(response);
      },
    }),
    getSubMatches: build.query<SubMatchResponse, { matchId: number }>({
      query: (data) => `/matches/${data.matchId}/submatch`,
      transformResponse: (response: ApiResponse<SubMatchResponse>) => {
        return handleResponse<SubMatchResponse>(response);
      },
      transformErrorResponse: (response: ErrorApiResponse) => {
        return handleErrorResponse(response);
      },
    }),
  }),
});
export const {
  useGetMatchInfoQuery,
  useDeleteMatchMutation,
  useLazyGetMatchInfoQuery,
  useUpdateMatchMutation,
  useCreateMatchMutation,
  useRegisterMatchMutation,
  useUnRegisterMatchMutation,
  useGetMatchListQuery,
  useLazyGetMatchListQuery,
  useGetMemberListInMatchQuery,
  useLazyGetMemberListInMatchQuery,
  useRegisterMemberListInMatchMutation,
  useUpdateSubMatchesMutation,
  useGetSubMatchesQuery,
  useLazyGetSubMatchesQuery,
} = matchApi;
