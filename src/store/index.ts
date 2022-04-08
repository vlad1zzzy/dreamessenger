import { configureStore } from '@reduxjs/toolkit';
import dialogueReducer from "./slices/dialogue";
import dialoguesReducer from "./slices/dialogues";
import userReducer from './slices/user';

export const store = configureStore({
    reducer: {
        user: userReducer,
        dialogues: dialoguesReducer,
        currentDialogue: dialogueReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

window.onbeforeunload = () => {
    const state = store.getState();
    if (state.user.isAuth) {
        localStorage.setItem('userCredentials', JSON.stringify(store.getState().user.credentials));
    }
};