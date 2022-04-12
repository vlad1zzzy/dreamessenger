import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from "axios";
import Api from "../../utils/axios";
import { UserCredentials } from "./user";

const { client } = new Api();

interface Message {
    created_at: string,
    edited_at: string,
    from_user: UserCredentials,
    picture: {
        link: string,
    },
    id: number,
}

export interface Messages {
    count: number,
    next: null,
    previous: null,
    results: Message[],
}

export interface DialogueState {
    messages: Messages,
    isLoading: boolean,
    error: string,
}

const initialDialogue: Messages = {
    count: 0,
    next: null,
    previous: null,
    results: [],
};

const initialState: DialogueState = {
    messages: initialDialogue,
    isLoading: false,
    error: '',
};


export interface SendMessageI {
    dialogueId: number,
    files: FormData,
}


export const getDialogueMessages = createAsyncThunk(
    'dialogue/messages',
    async (id: number, { rejectWithValue }) => {
        try {
            const response: AxiosResponse<Messages> = await client.get(`/dialogue/${id}/messages/`);

            return response.data;
        } catch (error) {
            rejectWithValue("Failed with dialogues request");
        }
    }
);

export const sendMessage = createAsyncThunk(
    'dialogue/send',
    async ({ dialogueId, files }: SendMessageI, { rejectWithValue, dispatch }) => {
        try {
            const response: AxiosResponse<Messages> = await client.post(`/dialogue/${dialogueId}/messages/send/`, files, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            dispatch(getDialogueMessages(dialogueId));

            return response.data;
        } catch (error) {
            rejectWithValue("Failed with dialogues request");
        }
    }
);


export const dialogueSlice = createSlice({
    name: 'dialogue',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = '';
        }
    },
    extraReducers: {
        [getDialogueMessages.pending.type]: (state) => {
            state.isLoading = true;
            state.error = '';
        },
        [getDialogueMessages.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [getDialogueMessages.fulfilled.type]: (state, action: PayloadAction<Messages>) => {
            state.isLoading = false;
            state.error = '';
            state.messages = action.payload;
        },
    },
});

export const { clearError } = dialogueSlice.actions;

export default dialogueSlice.reducer;