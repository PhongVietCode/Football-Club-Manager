type ApiResponse<T> = {
  code: number;
  result: T | null;
  message: string | null;
};

type ErrorApiResponse = {
  data: {
    code: number;
    message: string;
  };
  status: number;
};
