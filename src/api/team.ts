import { handleErrorResponse, handleResponse } from "@/common";
import { api } from ".";

export const teamApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    splitTeam: build.mutation<
      TeamSplitResponse[],
      { creatorId: string; matchId: number; teamNumber: number }
    >({
      query: (data) => ({
        url: `/teams/split`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response: ApiResponse<TeamSplitResponse[]>) => {
        return handleResponse<TeamSplitResponse[]>(response);
      },
      transformErrorResponse: (response: ErrorApiResponse) => {
        return handleErrorResponse(response);
      },
    }),
    saveTeam: build.mutation<
      string,
      { creatorId: string; matchId: number; teams: TeamSplitResponse[] }
    >({
      query: (data) => ({
        url: `/teams/save`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response: ApiResponse<string>) => {
        return handleResponse<string>(response);
      },
      transformErrorResponse: (response: ErrorApiResponse) => {
        return handleErrorResponse(response);
      },
    }),
    modifyTeam: build.mutation<
      string,
      { creatorId: string; matchId: number; teams: TeamSplitResponse[] }
    >({
      query: (data) => ({
        url: `/teams/modify`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: ApiResponse<string>) => {
        return handleResponse<string>(response);
      },
      transformErrorResponse: (response: ErrorApiResponse) => {
        return handleErrorResponse(response);
      },
    }),
  }),
});
export const {
  useModifyTeamMutation,
  useSaveTeamMutation,
  useSplitTeamMutation,
} = teamApi;
