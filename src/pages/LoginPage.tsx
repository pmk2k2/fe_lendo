import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import { useLoginMu } from '../api/auth/auth.api';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';
import AppleLogin from 'react-apple-login';

const LoginPage: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const mutation = useLoginMu(); // Use the API hook

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if (!email || !validateEmail(email)) {
            setError('Invalid email');
            return;
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        mutation.mutate({ email, password }, {
            onSuccess: () => {
                setError(null);
                localStorage.setItem('user', JSON.stringify({ email }));
                navigate('/home');
            },
            onError: (error: any) => {
                setError(`Login failed: ${error.message}`);
            },
        });
    };

    const isLoading = mutation.status === 'pending';

    const responseGoogleSuccess = (response: any) => {
        console.log(response);
    };

    const responseGoogleError = () => {
        console.log("Google login failed");
    };

    const responseFacebook = (response: any) => {
        console.log(response);
    };

    const responseApple = (response: any) => {
        console.log(response);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-transparent py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-6">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Log in
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <RouterLink to="/signup" className="font-medium text-black hover:text-blue-600 underline">
                            Sign up
                        </RouterLink>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-600 focus:border-blue-600 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-600 focus:border-blue-600 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging In...' : 'Log In'}
                        </button>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-2">
                        <FacebookLogin
                            appId="YOUR_FACEBOOK_APP_ID"
                            autoLoad={false}
                            fields="name,email,picture"
                            callback={responseFacebook}
                            render={({ onClick }) => (
                                <button
                                    type="button"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                                    onClick={onClick}
                                >
                                    <FacebookIcon className="h-5 w-5 text-blue-600 mr-2" />
                                    Continue with Facebook
                                </button>
                            )}
                        />
                        <AppleLogin
                            clientId="YOUR_APPLE_CLIENT_ID"
                            redirectURI="YOUR_REDIRECT_URI"
                            responseType="code"
                            responseMode="form_post"
                            usePopup={true}
                            callback={responseApple}
                            render={({ onClick }) => (
                                <button
                                    type="button"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                                    onClick={onClick}
                                >
                                    <AppleIcon className="h-5 w-5 text-gray-700 mr-2" />
                                    Continue with Apple
                                </button>
                            )}
                        />
                        <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
                            <div className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <GoogleIcon className="h-5 w-5 text-red-500 mr-2" />
                                <GoogleLogin
                                    onSuccess={responseGoogleSuccess}
                                    onError={responseGoogleError}
                                />
                            </div>
                        </GoogleOAuthProvider>
                    </div>
                    <div className="mt-4 text-center text-sm text-gray-600">
                        By clicking continue, you agree to our{' '}
                        <RouterLink to="/terms" className="font-medium text-black hover:text-blue-600">
                            Terms of Service
                        </RouterLink>{' '}
                        and{' '}
                        <RouterLink to="/privacy" className="font-medium text-black hover:text-blue-600">
                            Privacy Policy
                        </RouterLink>.
                    </div>
                    {error && (
                        <div className="mt-4 text-center text-sm text-red-600">
                            {error}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export default LoginPage;
