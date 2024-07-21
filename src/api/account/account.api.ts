import { useQuery, QueryClient } from "@tanstack/react-query";
import { createApiFactory } from "../factory";
import { useAuthUser } from "react-auth-kit";
import { GetAccountRes } from "./account.types";
import { tokenStorage } from "../../static";

const fetchAccount = createApiFactory("/api/auth/account/");

const getAccount = async (userId: string): Promise<GetAccountRes> => {
    const response = await fetchAccount(userId);
    return response.data; // Ensure you are returning the correct data structure
};

export const useGetProfile = (userId: string) => {
    return useQuery<GetAccountRes, Error>({
        queryKey: ["account", userId],
        queryFn: () => getAccount(userId),
        staleTime: Infinity,
        enabled: !!userId,
    });
};

export const getAuthedProfileLoader = (queryClient: QueryClient) => async () => {
    const authedState = tokenStorage.getItem("_token_state", "safe");
    if (authedState) {
        await queryClient.prefetchQuery({
            queryKey: ["account", authedState.id],
            queryFn: () => getAccount(authedState.id),
        });
    }
    return null;
};

export const useGetAuthedProfile = () => {
    const user = useAuthUser()();
    return useGetProfile(user?.id ?? "");
};
