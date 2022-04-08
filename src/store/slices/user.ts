import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Api from "../../utils/axios";

const { client } = new Api();

export type UserCredentials = {
    username: string,
    first_name: string,
    last_name: string,
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

const getInitialCredentials = () => {
    let localCredentials = localStorage.getItem('userCredentials');
    if (!localCredentials || localCredentials === 'undefined') {
        return {
            username: "",
            first_name: "",
            last_name: "",
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
    async (username: string | '', { rejectWithValue }) => {
        try {
            const url = username ? `/user/find/${username}/` : '/user/my/';
            const response = await client.get(url);

            const { first_name, last_name } = response.data;

            return {
                username: username,
                first_name: first_name,
                last_name: last_name,
            } as UserCredentials;
        } catch (error) {
            throw rejectWithValue("Failed with getting user");
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
        [getUser.fulfilled.type]: (state, action: PayloadAction<UserCredentials>) => {
            state.isLoading = false;
            state.error = "";
            state.credentials = action.payload;
            state.isAuth = false;
        },
    },
});

export const { clearError } = userSlice.actions;

export default userSlice.reducer;