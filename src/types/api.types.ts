
export interface RequestOption extends RequestInit {
  params?: Record<string, string>;
  token?: string;
  useStorageToken?: boolean;
}

export type ApiFactory = <TData extends BaseApiRes<any>>(
    url: string,
    options?: RequestOption
) => Promise<TData>;

export interface DataSchema {
  code?: 0 | 1;
  message?: string | null;
  [key: string]: any;
}

export interface BaseApiRes<T> {
  data: T;
  message: string;
  status: string;
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
