import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import { auth, googleProvider, facebookProvider, appleProvider } from '../firebase';
import {signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        if (!validateEmail(email)) {
            setError('Invalid email');
            return;
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const user = result.user;
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/home');
        } catch (error: any) {
            setError(`Login failed: ${handleFirebaseError(error)}`);
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = async (provider: any) => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/home');
        } catch (error: any) {
            setError(`Social login failed: ${handleFirebaseError(error)}`);
        } finally {
            setLoading(false);
        }
    };

    const handleFirebaseError = (error: any) => {
        switch (error.code) {
            case 'auth/user-not-found':
                return 'No account found with this email.';
            case 'auth/wrong-password':
                return 'Incorrect password.';
            case 'auth/too-many-requests':
                return 'Too many login attempts. Try again later.';
            case 'auth/invalid-email':
                return 'The email address is invalid.';
            case 'auth/account-exists-with-different-credential':
                return 'An account with this email already exists with different credentials.';
            case 'auth/popup-closed-by-user':
                return 'The login popup was closed before completing.';
            default:
                return `An unknown error occurred. Error code: ${error.code}`;
        }
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
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-600 focus:border-blue-600 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {loading ? 'Logging in...' : 'Log in'}
                        </button>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-2">
                        <button
                            type="button"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                            onClick={() => handleSocialLogin(facebookProvider)}
                        >
                            <FacebookIcon className="h-5 w-5 text-blue-600 mr-2" />
                            {loading ? 'Loading...' : 'Continue with Facebook'}
                        </button>
                        <button
                            type="button"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                            onClick={() => handleSocialLogin(appleProvider)}
                        >
                            <AppleIcon className="h-5 w-5 text-gray-700 mr-2" />
                            {loading ? 'Loading...' : 'Continue with Apple'}
                        </button>
                        <button
                            type="button"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => handleSocialLogin(googleProvider)}
                        >
                            <GoogleIcon className="h-5 w-5 text-red-500 mr-2" />
                            {loading ? 'Loading...' : 'Continue with Google'}
                        </button>
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
