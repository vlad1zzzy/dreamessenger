import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

export const useError = (
    error: string,
    cleanUpErrorFunction: ActionCreatorWithoutPayload,
    preCleanUpFunction?: () => void
) => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (error) {
            preCleanUpFunction?.();

            const id = setTimeout(() => {
                dispatch(cleanUpErrorFunction());
            }, 3000);

            return () => {
                clearTimeout(id);
            };
        }
    }, [error]);
};