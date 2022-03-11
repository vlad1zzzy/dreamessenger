import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user';

export const store = configureStore({
    reducer: {
        user: userReducer,
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