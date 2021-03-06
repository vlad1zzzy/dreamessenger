import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from "axios";
import Api from "../../utils/axios";
import { UserCredentials } from "./user";

const { client } = new Api();

interface Dialogue {
    id: number,
    users: UserCredentials[],
}

export interface Dialogues {
    count: number,
    next: null,
    previous: null,
    results: Dialogue[],
}

export interface DialoguesState {
    dialogues: Dialogues,
    isLoading: boolean,
    error: string,
}

const initialDialogues: Dialogues = {
    count: 0,
    next: null,
    previous: null,
    results: [],
};

const initialState: DialoguesState = {
    dialogues: initialDialogues,
    isLoading: false,
    error: '',
};

export const getDialogues = createAsyncThunk(
    'dialogues/get',
    async (_, { rejectWithValue }) => {
        try {
            const response: AxiosResponse<Dialogues> = await client.get('/dialogue/my/');

            return response.data;
        } catch (error) {
            rejectWithValue("Failed with dialogues request");
        }
    }
);


export const createDialogue = createAsyncThunk(
    'dialogues/create',
    async (username: string, { rejectWithValue, dispatch }) => {
        try {
            const response = await client.post('/dialogue/create/', {
                with_user: username,
            });

            dispatch(getDialogues());

            return response.data;
        } catch (error) {
            rejectWithValue("Failed with dialogues request");
        }
    }
);


export const dialoguesSlice = createSlice({
    name: 'dialogues',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = '';
        }
    },
    extraReducers: {
        [getDialogues.pending.type]: (state) => {
            state.isLoading = true;
            state.error = '';
        },
        [getDialogues.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
            state.dialogues = initialDialogues;
        },
        [getDialogues.fulfilled.type]: (state, action: PayloadAction<Dialogues>) => {
            state.isLoading = false;
            state.error = '';
            state.dialogues = action.payload;
        },
        [createDialogue.pending.type]: (state) => {
            state.isLoading = true;
            state.error = '';
        },
        [createDialogue.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
            state.dialogues = initialDialogues;
        },
        [createDialogue.fulfilled.type]: (state, action: PayloadAction<Dialogues>) => {
            state.isLoading = false;
            state.error = '';
        },
    },
});

export const { clearError } = dialoguesSlice.actions;

export default dialoguesSlice.reducer;