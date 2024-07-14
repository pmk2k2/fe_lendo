import { createQuery } from "react-query-kit";
import { createApiFactory } from "../factory";
import { useAuthUser } from "react-auth-kit";
import { GetAccountRes } from "./account.types";
import type { QueryClient } from "@tanstack/react-query";
import { tokenStorage } from "../../static";
import { BaseApiRes } from "../../types/api.types";

const fetchAccount = createApiFactory("/api/auth/account/");

export const useGetProfile = createQuery<GetAccountRes, string, BaseApiRes>({
  primaryKey: "account",
  queryFn: ({ queryKey: [, userId] }) => fetchAccount(userId),
});

export const getAuthedProfileLoader =
  (queryClient: QueryClient) => async () => {
    const { getKey, queryFn } = useGetProfile;
    const authedState = tokenStorage.getItem("_token_state", "safe");
    if (authedState)
      queryClient.prefetchQuery(getKey(authedState.id), {
        queryFn,
      });
    return null;
  };

export const useGetAuthedProfile = () => {
  const user = useAuthUser()();

  return useGetProfile({
    variables: user?.id,
    enabled: !!user?.id,
    select: (data) => data.data,
    staleTime: Infinity,
    useErrorBoundary: true,
  });
};
