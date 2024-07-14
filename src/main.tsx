import {
    QueryCache,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import dayjs from "dayjs";
import dayjsDurationPlugin from "dayjs/plugin/duration.js";
import LocalizedFormat from "dayjs/plugin/localizedFormat.js";
import React from "react";
import ReactDOM from "react-dom/client";
import {
    LoaderFunction,
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";
import {
    getAuthedProfileLoader,
    useGetProfile,
} from "./api/account/account.api.ts";
import { AuthProvider } from "./components/AuthProvider.tsx";
import Root  from "./components/Layout.tsx";
import "./index.css";
import { ROUTES, tokenStorage } from "./static.ts";
import { message } from "antd";
import { renewTokenLoader } from "./api/auth/auth.api.ts";
import { getAllActiveCategoriesLoader } from "./api/category/category.api.ts";
import Home from "./pages/Home.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Help from "./pages/Help.tsx";
dayjs.extend(dayjsDurationPlugin);
dayjs.extend(LocalizedFormat);

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (err, query) => {
            // 🎉 only show error toasts if we already have data in the cache
            // which indicates a failed background update else handle thing locally
            const error = err as Error;
            if (query.state.data !== undefined) {
                message.error(
                    `Something went wrong: ${error.message}, fail to refetch data`
                );
            }
            if (error.cause === 401) {
                // log user out imperatively
                const profileKey = useGetProfile.getKey();
                tokenStorage.clear();
                queryClient.setQueryData(profileKey, null);
            }
        },
    }),
    defaultOptions: {
        queries: {
            retry: (failureCount, err) => {
                const error = err as Error;
                console.error(error);
                if (
                    error.cause === 401 ||
                    error.cause === 400 ||
                    error.message === "Failed to fetch"
                ) {
                    return false;
                } else if (failureCount < 3) {
                    return true;
                } else return false;
            },
        },
    },
});

const loaderCombinatorWthQc =
    (qc: typeof queryClient) =>
        (...cbs: ((qc: typeof queryClient) => LoaderFunction)[]) => {
            cbs.forEach((cb) => cb(qc));
            return undefined;
        };
const loaderCombinator = loaderCombinatorWthQc(queryClient);

const router = createBrowserRouter([
    {
        element: <AuthProvider />,
        loader: renewTokenLoader(queryClient),
        children: [
            {
                loader: loaderCombinator(
                    getAuthedProfileLoader,
                    getAllActiveCategoriesLoader
                ),
                element: <Root />,
                children: [
                    { path: ROUTES.ROOT.HOME.path, element: <Home /> },
                    { path: ROUTES.ROOT.LANDINGPAGE.path, element: <Home /> },
                    { path: ROUTES.ROOT.ABOUT.path, element: <About /> },
                    { path: ROUTES.ROOT.CONTACT.path, element: <Contact /> },
                    { path: ROUTES.ROOT.HELP.path, element: <Help /> },
                    { path: ROUTES.loginRoot.Login.path, element: <LoginPage /> },
                    { path: ROUTES.loginRoot.SignUp.path, element: <SignUpPage />,},
                    { path: ROUTES.ROOT.SIGNUP.path, element: <SignUpPage /> },

                ],
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools />
        </QueryClientProvider>
    </React.StrictMode>
);

