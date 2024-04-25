export interface ErrorResponseData {
  error?: string;
}

export interface ResponseData<T = undefined> extends ErrorResponseData {
  data?: T;
  message: string;
  statusCode: number;
}
