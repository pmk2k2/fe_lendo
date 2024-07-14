import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ConfigProvider, Layout, App } from "antd";
import { useIsAuthenticated, useSignIn } from "react-auth-kit";
import {handleSignin, useRenewToken} from "../api/auth/auth.api";
import Header from "./Header";
import Footer from "./Footer";

const { Content } = Layout;

const Root: React.FC = () => {
    const signIn = useSignIn();
    const isAuthenticated = useIsAuthenticated()();
    const { data, isSuccess } = useRenewToken({ enabled: isAuthenticated });

    useEffect(() => {
        if (!!data && isSuccess && !isAuthenticated) {
            handleSignin(signIn)(data);
        }
    }, [data, isSuccess, signIn, isAuthenticated]);

    return (
        <ConfigProvider>
            <App>
                <Layout className="min-h-screen flex flex-col">
                    <Header />
                    <Content className="container mx-auto flex-grow">
                        <Outlet />
                    </Content>
                    <Footer />
                </Layout>
            </App>
        </ConfigProvider>
    );
};

export default Root;
