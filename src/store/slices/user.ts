import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import config from '../../../config.json'

const {API_URL} = config;

export type UserCredentials = {
    username: string,
    password: string,
    firstName: string,
    lastName: string,
}

export type LoginCredentials = Pick<UserCredentials, "username" | "password">

export interface UserState {
    credentials: UserCredentials,
    isLoading: boolean,
    error: string,
}

const initialState: UserState = {
    credentials: {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
    },
    isLoading: false,
    error: "",
}

export const registerUser = createAsyncThunk(
    'user/register',
    async (credentials: UserCredentials, {rejectWithValue}) => {
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            })

            console.log(await response.json())

            return (await response.json() as UserCredentials)
        } catch (e) {
            throw rejectWithValue("Failed on registration");
        }
    }
)

export const loginUser = createAsyncThunk(
    'user/login',
    async (credentials: LoginCredentials, {rejectWithValue}) => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            })

            console.log(await response.json())

            return (await response.json() as UserCredentials)
        } catch (e) {
            throw rejectWithValue("Failed on login");
        }
    }
)


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        [registerUser.pending.type]: (state) => {
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
        },
        [loginUser.pending.type]: (state) => {
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
        },
    },
})

export const {} = userSlice.actions

export default userSlice.reducer