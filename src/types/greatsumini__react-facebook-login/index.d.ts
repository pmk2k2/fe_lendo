declare module '@greatsumini/react-facebook-login' {
    interface FacebookLoginProps {
        appId: string;
        autoLoad?: boolean;
        fields?: string;
        callback: (response: any) => void;
        render?: (props: { onClick: () => void }) => JSX.Element;
    }

    const FacebookLogin: React.FC<FacebookLoginProps>;

    export default FacebookLogin;
}
