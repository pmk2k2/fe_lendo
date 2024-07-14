import { createQuery } from "react-query-kit";
import { createApiFactory } from "../factory";
import type { GetAllActiveCategoriesRes } from "./category.types";
import { BaseApiRes, PageParams } from "../../types/api.types";
import { QueryClient } from "@tanstack/react-query";
import type { LoaderFunction } from "react-router";

const fetchCategories = createApiFactory("/api/product/category/");

export const getAllActiveCategoriesLoader =
  (queryClient: QueryClient): LoaderFunction =>
  async () => {
    const { getKey, queryFn } = useAllActiveCategories;
    await queryClient.prefetchQuery(
      getKey({ pageSize: 8, pageNo: 0 }),
      queryFn
    );
    return null;
  };
export const useAllActiveCategories = createQuery<
  GetAllActiveCategoriesRes,
  Partial<PageParams>,
  BaseApiRes
>({
  primaryKey: "view/all",
  queryFn: ({ queryKey: [primaryKey, params] }) =>
    fetchCategories(primaryKey, { params, useStorageToken: false }),
});
