export interface ServerSuccessResponse<T> {
  status: "success";
  data: T;
}
