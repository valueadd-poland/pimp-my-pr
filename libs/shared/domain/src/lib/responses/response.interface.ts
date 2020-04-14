export interface IResponse<T = any, E = any> {
  data: T;
  error: E;
}
