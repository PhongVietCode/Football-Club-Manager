export const handleResponse = <T>(response: ApiResponse<T>) => {
    return response.result as T;
}