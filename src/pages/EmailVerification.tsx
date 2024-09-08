import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { message, Input, Button } from 'antd';
import { applyActionCode, verifyBeforeUpdateEmail } from 'firebase/auth';

import { auth } from '../firebase';

const EmailVerification: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [confirmationCode, setConfirmationCode] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const codeFromUrl = searchParams.get('oobCode');
        const emailFromUrl = searchParams.get('email');

        if (codeFromUrl) {
            setConfirmationCode(codeFromUrl);
        }
        if (emailFromUrl) {
            setEmail(emailFromUrl);
        }
    }, [searchParams]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        if (!confirmationCode) {
            setError('Confirmation code is missing.');
            return;
        }

        setLoading(true);
        try {
            // Verify the action code
            await applyActionCode(auth, confirmationCode);
            message.success('Email successfully verified!');

            // Optional: Update email if needed (e.g., for password reset)
            if (email) {
                await verifyBeforeUpdateEmail(auth.currentUser!, email);
            }

            navigate('/login');
        } catch (error: any) {
            setError(`Verification failed: ${handleFirebaseError(error)}`);
        } finally {
            setLoading(false);
        }
    };

    const handleFirebaseError = (error: any) => {
        switch (error.code) {
            case 'auth/invalid-action-code':
                return 'Invalid or expired confirmation code.';
            case 'auth/action-code-expired':
                return 'Confirmation code has expired.';
            case 'auth/invalid-email':
                return 'Invalid email address.';
            default:
                return `An unknown error occurred. Error code: ${error.code}`;
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-transparent py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-6">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Verify your Email
                </h2>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm">
                        <div>
                            <Input
                                placeholder="Confirmation code"
                                value={confirmationCode}
                                onChange={(e) => setConfirmationCode(e.target.value)}
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                            />
                        </div>
                        <div>
                            <Input
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
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
                        {loading ? 'Verifying...' : 'Verify Email'}
                    </Button>
                    {error && <p className="mt-4 text-center text-red-600">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default EmailVerification;
