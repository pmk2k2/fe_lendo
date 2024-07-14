import { createMutation, createQuery } from "react-query-kit";
import { createApiFactory } from "../factory";
import type {
  CreateCommodityRes,
  CreateCommodityVars,
  GetCommodityByIdRes,
} from "./commodity.types";
import type { BaseApiRes } from "../../types/api.types";
import { QueryClient } from "@tanstack/react-query";
import { LoaderFunction } from "react-router-dom";

const commodityApi = createApiFactory("/api/product/commodity/");

export const useCreateCommodity = createMutation<
  CreateCommodityRes,
  CreateCommodityVars,
  BaseApiRes
>({
  mutationFn: (body) =>
    commodityApi("create", {
      method: "POST",
      body,
      useStorageToken: true,
    }),
});

export const getCommodityByIdLoader =
  (queryClient: QueryClient): LoaderFunction =>
  async ({ params }) => {
    const { getKey, queryFn } = useGetCommodityById;
    await queryClient.prefetchQuery(getKey(params.id), { queryFn });
    return null;
  };
export const useGetCommodityById = createQuery<
  GetCommodityByIdRes,
  string,
  BaseApiRes
>({
  primaryKey: "view",
  queryFn: ({ queryKey: [primaryKey, id] }) =>
    commodityApi(`${primaryKey}/${id}`),
});
