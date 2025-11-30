export const handleApiError = (error, message) => {
    const errorMsg = error.response?.data?.message || message;
    throw new Error(errorMsg);
};
