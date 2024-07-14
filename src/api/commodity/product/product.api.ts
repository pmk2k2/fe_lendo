import { createQuery } from "react-query-kit";
import { createApiFactory } from "../../factory";
import type { BaseApiRes, PageParams } from "../../../types/api.types";
import { OwnerProduct } from "./product.type";
import type { QueryClient } from "@tanstack/react-query";
import { LoaderFunction } from "react-router";

const productApi = createApiFactory("/api/product/");

export const getAllByOwnerLoader = (queryClient: QueryClient) => async () => {
  const { getKey, queryFn } = useGetAllByOwner;
  await queryClient.prefetchQuery(getKey({}), { queryFn });
  return null;
};
export const useGetAllByOwner = createQuery<
  OwnerProduct,
  Partial<PageParams>,
  BaseApiRes
>({
  primaryKey: "owner",
  queryFn: ({ queryKey: [primaryKey, params] }) =>
    productApi(primaryKey, {
      params,
      useStorageToken: true,
    }),
});

export const getDetailsByIdLoader = (queryClient: QueryClient): LoaderFunction =>
  async ({ params }) => {
    const { getKey, queryFn } = useGetDetailsById;
    await queryClient.prefetchQuery(getKey(params.id), { queryFn });
    return null;
  };
export const useGetDetailsById = createQuery<BaseApiRes, string, BaseApiRes>({
  primaryKey: "view",
  queryFn: ({ queryKey: [primaryKey, id] }) =>
    productApi(`${primaryKey}/${id}`),
});
