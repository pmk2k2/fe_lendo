import { tokenStorage } from "../static";
import { ApiFactory, BaseApiRes, RequestOption } from "../types/api.types";

const BASE_URL = "https://fe-lendo.vercel.app/";

export const createApiFactory = (
    baseUrl: string,
    defaultOptions?: RequestInit
): ApiFactory => {
  const buildUrl = (path = "", params?: URLSearchParams) =>
      `${BASE_URL}${baseUrl}${path}` + (params ? `?${params}` : "");

  return async function <TData extends BaseApiRes<any>>(
      url = "",
      options?: RequestOption
  ): Promise<TData> {
    const token =
        options?.token ??
        (options?.useStorageToken && tokenStorage.getItem("_token", "raw"));

    const headers: HeadersInit = {
      ...options?.headers,
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    };
    const searchParams = options?.params
        ? new URLSearchParams(options.params as Record<string, string>)
        : undefined;

    const response = await fetch(buildUrl(url, searchParams), {
      ...defaultOptions,
      ...options,
      body: options?.body ? JSON.stringify(options.body) : undefined,
      headers,
    });

    try {
      const data = await response.json();
      if (!response.ok) {
        console.error(
            `${response.status} ${data.message ?? JSON.stringify(data)}`
        );
        throw new Error(
            `Status ${response.status}: ${data.message ?? JSON.stringify(data)}`,
            {
              cause: response.status,
            }
        );
      }
      return data;
    } catch (error) {
      const err = error as Error;
      console.error("Fetch error:", err.message);
      throw new Error(`Error: ${err.message}`, { cause: response.status });
    }
  };
};
