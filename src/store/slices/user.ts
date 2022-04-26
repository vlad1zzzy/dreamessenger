import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from "axios";
import Api from "../../utils/axios";

const { client } = new Api();

export type UserCredentials = {
    username: string,
    first_name: string,
    last_name: string,
    info: {
        avatar: null | {
            link: string,
        },
    }
}

export type LoginCredentials = {
    username: string,
    password: string,
}

export type RegisterCredentials = UserCredentials & LoginCredentials;

export interface UserState {
    credentials: UserCredentials,
    isLoading: boolean,
    error: string,
    isAuth: boolean,
}

export interface Users {
    count: number,
    next: null,
    previous: null,
    results: UserCredentials[],
}

export const initialUsers = {
    count: 0,
    next: null,
    previous: null,
    results: [],
};

const getInitialCredentials = () => {
    let localCredentials = localStorage.getItem('userCredentials');
    if (!localCredentials || localCredentials === 'undefined') {
        return {
            username: "",
            first_name: "",
            last_name: "",
            info: {
                avatar: null,
            }
        };
    }

    return JSON.parse(localCredentials) as UserCredentials;
};

const initialState: UserState = {
    credentials: {
        ...getInitialCredentials(),
    },
    isLoading: false,
    error: "",
    isAuth: Boolean(localStorage.getItem('user')),
};

export const registerUser = createAsyncThunk(
    'user/register',
    async (credentials: RegisterCredentials, { rejectWithValue, dispatch }) => {
        const {
            username,
            password,
            first_name,
            last_name,
        } = credentials;

        try {
            await client.post(`/auth/register/`, credentials);

            dispatch(loginUser({
                username,
                password,
            }));

            return {
                username,
                first_name,
                last_name,
            } as UserCredentials;
        } catch (error) {
            throw rejectWithValue("Failed on register");
        }
    }
);

export const loginUser = createAsyncThunk(
    'user/login',
    async (credentials: LoginCredentials, { dispatch, rejectWithValue }) => {
        try {
            const response = await client.post(`/auth/token/login/`, credentials);

            localStorage.setItem('user', JSON.stringify(response.data));

            const { payload } = await dispatch(getUser(''));

            return {
                username: credentials.username,
                first_name: (payload as UserCredentials).first_name,
                last_name: (payload as UserCredentials).last_name,
                info: {
                    avatar: (payload as UserCredentials).info.avatar
                }
            } as UserCredentials;
        } catch (error) {
            throw rejectWithValue("Failed on login");
        }
    }
);

export const logoutUser = createAsyncThunk(
    'user/logout',
    async () => {
        localStorage.removeItem('user');
        localStorage.removeItem('userCredentials');

        return initialState.credentials;
    }
);

export const getUser = createAsyncThunk(
    'user/get',
    async (usernameRequest: string | '', { rejectWithValue }) => {
        try {
            const url = usernameRequest ? `/user/find/${usernameRequest}/` : '/user/my/';
            const response = await client.get(url);

            return response.data as UserCredentials;
        } catch (error) {
            throw rejectWithValue("Failed with getting user");
        }
    }
);


export const changeUserAvatar = createAsyncThunk(
    'user/avatar',
    async (avatar: FormData, { rejectWithValue, dispatch }) => {
        try {
            const response = await client.post(`/user/avatar/`, avatar, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            dispatch(getUser(''));

            return response.data;
        } catch (error) {
            throw rejectWithValue("Failed with changing avatar");
        }
    }
);


export const suggestUser = createAsyncThunk(
    'user/suggest',
    async (username: string, { rejectWithValue }) => {
        try {
            const response: AxiosResponse<Users> = await client.get(`/user/suggest/?name_substring=${username}`);

            return response.data;
        } catch (error) {
            throw rejectWithValue("Failed with searching users");
        }
    }
);


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = '';
        }
    },
    extraReducers: {
        [registerUser.pending.type]: (state) => {
            state.error = "";
            state.isLoading = true;
        },
        [registerUser.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [registerUser.fulfilled.type]: (state, action: PayloadAction<UserCredentials>) => {
            state.isLoading = false;
            state.error = "";
            state.credentials = action.payload;
            state.isAuth = true;
        },
        [loginUser.pending.type]: (state) => {
            state.error = "";
            state.isLoading = true;
        },
        [loginUser.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [loginUser.fulfilled.type]: (state, action: PayloadAction<UserCredentials>) => {
            state.isLoading = false;
            state.error = "";
            state.credentials = action.payload;
            state.isAuth = true;
        },
        [logoutUser.pending.type]: (state) => {
            state.error = "";
            state.isLoading = true;
        },
        [logoutUser.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [logoutUser.fulfilled.type]: (state, action: PayloadAction<UserCredentials>) => {
            state.isLoading = false;
            state.error = "";
            state.credentials = action.payload;
            state.isAuth = false;
        },
        [getUser.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getUser.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
            state.credentials = getInitialCredentials();
            state.isAuth = false;
        },
        [getUser.fulfilled.type]: (state, action: PayloadAction<UserCredentials>) => {
            state.isLoading = false;
            state.error = "";
            state.credentials = action.payload;
        },
    },
});

export const { clearError } = userSlice.actions;

export default userSlice.reducer;