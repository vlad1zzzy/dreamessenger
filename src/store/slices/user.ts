import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Api from "../../utils/axios";

const { client } = new Api();

export type UserCredentials = {
    username: string,
    firstName: string,
    lastName: string,
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
            firstName: "",
            lastName: "",
        };
    }
    const credentials = JSON.parse(localCredentials) as UserCredentials;
    console.log(credentials, "credentials");

    return credentials;
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
            firstName: first_name,
            lastName: last_name,
        } = credentials;

        try {
            const response = await client.post(`/auth/register/`, {
                username,
                password,
                first_name,
                last_name,
            });

            console.log(response, "REGISTER RESPONSE");

            dispatch(loginUser({
                username,
                password,
            }));

            return {
                username,
                firstName: first_name,
                lastName: last_name,
            } as UserCredentials;
        } catch (error) {
            // TODO errors from response
            // const axiosError = error as AxiosError;
            throw rejectWithValue("Failed on register");
        }
    }
);

export const loginUser = createAsyncThunk(
    'user/login',
    async (credentials: LoginCredentials, { rejectWithValue }) => {
        try {
            const response = await client.post(`/auth/token/login/`, credentials);

            console.log(response, "RESPONSE LOGIN");

            localStorage.setItem('user', JSON.stringify(response.data));

            // TODO request for user credentials
            return {
                username: credentials.username,
                firstName: "firstname (todo login)",
                lastName: "lastName (todo login)",
            } as UserCredentials;
        } catch (error) {
            // TODO errors from response
            // const axiosError = error as AxiosError;
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
    },
});

export const { clearError } = userSlice.actions;

export default userSlice.reducer;