import API from "../api/axios";
import { handleApiError } from "./errorHandle";

export const registerUser = async ({ name, email, password, role }) => {
    try {
        const res = await API.post("/user/register", {
            name,
            email,
            password,
            role
        });
        return res.data;
    } catch (error) {
        handleApiError(error, `Something went wrong while register :`)
    }
}
export const login = async ({ email, password }) => {
    try {
        const res = await API.post("/user/login", {
            email,
            password
        })
        return res.data;
    } catch (error) {
        handleApiError(error, `Something went wrong while login :`)

    }
}
export const change_password = async ({ oldPassword, newPassword }) => {
    try {
        const res = await API.patch("/user/change-password", {
            oldPassword,
            newPassword
        })
        return res.data;
    } catch (error) {
        handleApiError(error, `Something went wrong while changing password :`)

    }
}
export const logout = async () => {
    try {
        const res = await API.post("/user/logout");
        return res.data;
    } catch (error) {
        handleApiError(error, `Something went wrong while logout :`)
    }
}
export const upload_profile = async ({ image }) => {
    const res = await API.patch("/user/upload-profile", {
        image
    })
    return res.data;
}
export const profile = async () => {
    const res = await API.get("/user/profile");
    return res.data;
}
export const update_info = async ({ name, description }) => {
    const res = await API.patch("/user/update-info", {
        name,
        description
    });
    return res.data;
}

