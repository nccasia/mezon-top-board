export interface IBaseResponse<T = any> {
  data: T
  message: string
  statusCode: number
}
