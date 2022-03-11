import axios, { AxiosRequestConfig } from "axios";
import { UserTokens } from "../store/slices/user";
import jwt_decode from "jwt-decode";

import config from "../../config.json";

const { API_URL } = config;

export const axiosPrivate = axios.create({
    baseURL: API_URL,
});

const getAccessToken = () => {
    const { access } = JSON.parse(localStorage.getItem('user') || "{}") as UserTokens;

    return access || '';
};

const refreshToken = async () => {
    const { refresh } = JSON.parse(localStorage.getItem('user') || "{}") as UserTokens;

    try {
        const response = await axios.post(`${API_URL}/auth/token/refresh/`, {
            refresh,
        });

        console.log(response, "REFRESH RESPONSE");

        const { access } = response.data as UserTokens;
        localStorage.setItem('user', JSON.stringify({ access, refresh }));

        return access;
    } catch (error) {
        console.warn("Failed on refreshing token", error);
    }
};

axiosPrivate.interceptors.request.use(
    async (config = {
        headers: {
            "Content-Type": "application/json",
        }
    } as AxiosRequestConfig) => {
        let access = getAccessToken();

        let currentDate = new Date();
        if (access) {
            const decodedToken: { exp: number } = jwt_decode(access);
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                const updatedAccess = await refreshToken();
                if (updatedAccess) {
                    access = updatedAccess;
                }
            }
            if (config.headers) {
                config.headers["Authorization"] = `Bearer ${access}`;
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);