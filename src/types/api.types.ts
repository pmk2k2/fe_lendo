import { ObjAny } from "./utils.types";

export type RequestOption = Omit<RequestInit, "body"> & {
  params?: ObjAny;
  body?: ObjAny;
  token?: string;
  useStorageToken?: boolean;
};

export type ApiFactory<Schema = any> = <TData extends Schema>(
  url?: string,
  options?: RequestOption
) => Promise<TData>;

export interface DataSchema {
  code?: 0 | 1;
  message?: string | null;
  [key: string]: any;
}

export interface BaseApiRes {
  status: string;
  message: string;
  dateTime: string;
}

export type PageInfoRes = {
  pageNo: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  last: boolean;
};

export interface PageParams {
  pageNo: number;
  pageSize: number;
  sortBy: string;
  sortDir: "desc" | "asc";
}
