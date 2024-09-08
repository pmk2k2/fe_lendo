import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import { auth, googleProvider, facebookProvider, appleProvider, createUserWithEmailAndPassword, sendEmailVerification } from '../firebase';
import { signInWithPopup, updateProfile, onAuthStateChanged} from 'firebase/auth';
import { message } from 'antd';

const SignUpPage: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [socialLoading, setSocialLoading] = useState<string | null>(null);
    const [emailSent, setEmailSent] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const firstName = formData.get('firstName') as string;
        const lastName = formData.get('lastName') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if (!email || !validateEmail(email)) {
            setError('Invalid email address');
            return;
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await updateProfile(user, { displayName: `${firstName} ${lastName}` });

            // Send email verification
            await sendEmailVerification(user);
            message.success('Verification email sent. Please check your inbox.');

            // Set flag to indicate email was sent
            setEmailSent(true);

            await auth.signOut();
            navigate('/login');
        } catch (error: any) {
            setError(`Signup failed: ${handleFirebaseError(error)}`);
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = async (provider: any, providerName: string) => {
        setSocialLoading(providerName);
        setError(null);

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            localStorage.setItem('user', JSON.stringify(user));
            navigate('/home');
        } catch (error: any) {
            setError(`Social signup failed: ${handleFirebaseError(error)}`);
        } finally {
            setSocialLoading(null);
        }
    };

    const handleFirebaseError = (error: any) => {
        switch (error.code) {
            case 'auth/email-already-in-use':
                return 'This email is already registered.';
            case 'auth/wrong-password':
                return 'Incorrect password.';
            case 'auth/user-not-found':
                return 'No account found with this email.';
            case 'auth/weak-password':
                return 'Password is too weak.';
            default:
                return 'An unknown error occurred.';
        }
    };

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-transparent py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-6">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <RouterLink to="/login" className="font-medium text-black hover:text-blue-600 underline">
                            Log in
                        </RouterLink>
                    </p>
                </div>
                {emailSent ? (
                    <div className="text-center text-sm text-gray-600">
                        <p>We have sent a verification email to your address. Please check your inbox and follow the instructions to verify your email.</p>
                    </div>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <InputField id="first-name" name="firstName" placeholder="First Name" />
                            <InputField id="last-name" name="lastName" placeholder="Last Name" />
                            <InputField id="email-address" name="email" type="email" placeholder="Email address" />
                            <InputField id="password" name="password" type="password" placeholder="Password" />
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {loading ? 'Signing Up...' : 'Sign Up'}
                            </button>
                        </div>
                        <SocialLoginButtons
                            loading={socialLoading}
                            handleSocialLogin={handleSocialLogin}
                        />
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
                        {error && <div className="mt-4 text-center text-sm text-red-600">{error}</div>}
                    </form>
                )}
            </div>
        </div>
    );
};

const InputField: React.FC<{
    id: string;
    name: string;
    type?: string;
    placeholder: string;
}> = ({ id, name, type = 'text', placeholder }) => (
    <div>
        <label htmlFor={id} className="sr-only">
            {name}
        </label>
        <input
            id={id}
            name={name}
            type={type}
            required
            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
            placeholder={placeholder}
        />
    </div>
);

const SocialLoginButtons: React.FC<{
    loading: string | null;
    handleSocialLogin: (provider: any, providerName: string) => Promise<void>;
}> = ({ loading, handleSocialLogin }) => (
    <>
        <button
            type="button"
            disabled={loading === 'facebook'}
            className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
            onClick={() => handleSocialLogin(facebookProvider, 'facebook')}
        >
            <FacebookIcon className="h-5 w-5 text-blue-600 mr-2" />
            {loading === 'facebook' ? 'Loading...' : 'Continue with Facebook'}
        </button>
        <button
            type="button"
            disabled={loading === 'apple'}
            className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
            onClick={() => handleSocialLogin(appleProvider, 'apple')}
        >
            <AppleIcon className="h-5 w-5 text-gray-700 mr-2" />
            {loading === 'apple' ? 'Loading...' : 'Continue with Apple'}
        </button>
        <button
            type="button"
            disabled={loading === 'google'}
            className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => handleSocialLogin(googleProvider, 'google')}
        >
            <GoogleIcon className="h-5 w-5 text-red-500 mr-2" />
            {loading === 'google' ? 'Loading...' : 'Continue with Google'}
        </button>
    </>
);

export default SignUpPage;
