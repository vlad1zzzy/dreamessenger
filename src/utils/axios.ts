import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import jwtDecode from "jwt-decode";

import config from "../../config.json";

const { API_URL } = config;

export type ApiOptions = {
    client?: AxiosInstance,
    access?: string,
    refresh?: string,
}

type UserTokens = {
    access: string,
    refresh: string,
}

export default class Api {
    public client: AxiosInstance;
    private access?: string;
    private refresh?: string;
    private refreshRequest: Promise<AxiosResponse<UserTokens>> | null;

    constructor(options: ApiOptions = {}) {
        this.client = options.client || axios.create({
            baseURL: API_URL,
        });
        this.access = options.access;
        this.refresh = options.refresh;
        this.refreshRequest = null;

        this.client.interceptors.request.use(
            async (config = {} as AxiosRequestConfig) => {
                this.updateTokens();

                if (!this.access) {
                    return config;
                }

                const newConfig = {
                    headers: {},
                    ...config,
                };

                newConfig.headers.Authorization = `Bearer ${this.access}`;
                return newConfig;
            },
            e => Promise.reject(e)
        );

        this.client.interceptors.response.use(
            r => r,
            async error => {
                this.updateTokens();

                if ((jwtDecode(this.refresh!) as { exp: number }).exp * 1000 < Date.now()) {
                    this.removeTokens();
                    throw error;
                }

                if (
                    !this.refresh ||
                    error.response.status !== 401 ||
                    error.config.retry
                ) {
                    throw error;
                }

                if (!this.refreshRequest) {
                    this.refreshRequest = this.client.post('/auth/token/refresh/', {
                        refresh: this.refresh,
                    });
                }
                const { data } = await this.refreshRequest;
                this.access = data.access;

                localStorage.setItem('user', JSON.stringify({ access: this.access, refresh: this.refresh }));

                const newRequest = {
                    ...error.config,
                    retry: true,
                };

                return this.client(newRequest);
            }
        );
    }

    updateTokens() {
        const { access, refresh } = JSON.parse(localStorage.getItem('user') || "{}") as UserTokens;
        this.access ||= access;
        this.refresh ||= refresh;
    }

    removeTokens() {
        localStorage.removeItem('user');
        localStorage.removeItem('userCredentials');
        this.updateTokens();
    }
}