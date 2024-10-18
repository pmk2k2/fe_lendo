import { message } from 'antd';

export const handleError = (error: unknown) => {
    let errorMessage = "An unknown error occurred. Please try again.";

    if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === "string") {
        errorMessage = error;
    }

    console.error("Error:", errorMessage);
    message.error(errorMessage);
};


export const handleApiError = async (response: Response) => {
    const errorData = await response.json();

    switch (response.status) {
        case 400:
            throw new Error(errorData.message || "Bad Request");
        case 401:
            throw new Error("Unauthorized: Please log in again.");
        case 403:
            throw new Error("Forbidden: You do not have permission.");
        case 404:
            throw new Error("Not Found: The requested resource was not found.");
        case 500:
            throw new Error("Server Error: Please try again later.");
        default:
            throw new Error("An unexpected error occurred.");
    }
};
export const handleFirebaseError = (error: any): string => {
    switch (error.code) {
        case 'auth/user-not-found':
            return 'No account found with this email.';
        case 'auth/wrong-password':
            return 'Incorrect password.';
        case 'auth/too-many-requests':
            return 'Too many login attempts. Try again later.';
        case 'auth/invalid-email':
            return 'The email address is invalid.';
        case 'auth/email-already-exists':
            return 'An account with this email already exists with different credentials.';
        case 'auth/popup-closed-by-user':
            return 'The login popup was closed before completing.';
        default:
            return `An unknown error occurred. Error code: ${error.code}`;
    }
};
