import React, { useState } from 'react';
import { message, Input, Button } from 'antd';
import { resendVerificationEmail } from '../firebase';

const ResendVerification: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        if (!validateEmail(email)) {
            setError('Invalid email');
            return;
        }

        setLoading(true);
        try {
            await resendVerificationEmail(email);
            message.success('Verification email sent successfully!');
        } catch (error: any) {
            setError(`Failed to resend email: ${handleFirebaseError(error)}`);
        } finally {
            setLoading(false);
        }
    };

    const handleFirebaseError = (error: any) => {
        switch (error.code) {
            case 'auth/user-not-found':
                return 'No account found with this email.';
            default:
                return `An unknown error occurred. Error code: ${error.code}`;
        }
    };

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-transparent py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-6">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Resend Verification Email
                </h2>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm">
                        <div>
                            <Input
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                            />
                        </div>
                    </div>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={loading}
                        loading={loading}
                        className="w-full"
                    >
                        {loading ? 'Sending...' : 'Resend Email'}
                    </Button>
                    {error && <p className="mt-4 text-center text-red-600">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default ResendVerification;
