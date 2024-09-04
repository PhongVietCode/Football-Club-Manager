import { toast } from "@/components/ui/use-toast";

export const handleErrorResponse = (errorResponse: ErrorApiResponse) => {
  if (errorResponse.data) {
    toast({
      title: errorResponse.data.message,
      description: "Please try again",
      variant: "destructive",
      duration: 2000,
    });
  } else {
    toast({
      title: "Server not response",
      description: "Please try again",
      variant: "destructive",
      duration: 2000,
    });
  }
  return errorResponse;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handleQueryStart = async (
  _id: unknown,
  _result: { dispatch: unknown; queryFulfilled: unknown }
) => {
  // try {
  // 	const { data } = await result.queryFulfilled
  // 	result.dispatch(setToken(""))
  // } catch (error: any) {
  // 	if (error.error.status === 401) result.dispatch(setIsTokenExpired({ isTokenExpired: true }))
  // }
};
