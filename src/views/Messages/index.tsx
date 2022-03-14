import React, { useEffect, useMemo } from 'react';

import classes from './index.module.scss';
import SearchInput from "../../components/SearchInput";
import List from "../../components/Blocks/List";
import Chat from "../../components/Blocks/Chat";

import { BLOCK_CONTENT_TYPE, FRIENDS, GROUPS } from "../../store/temp";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { getDialogues, clearError } from "../../store/slices/dialogues";
import Loader from "../../components/UI/Loader";
import Error from "../../components/UI/Error";
import { useError } from "../../hooks/useError";

interface MessagesI {

}

const Messages: React.FC<MessagesI> = ({}) => {
    const { dialogues, isLoading, error } = useSelector((state: RootState) => state.dialogues);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDialogues());

    }, []);

    useError(error, clearError);

    const dialoguesToDisplay = useMemo(() => {
        return dialogues.results.map((dialog) => {
            return {
                avatar: "04",
                title: dialog.users[0].username,
                subtitle: "Dinner?",
                online: false,
                time: "Today, 8:56pm",
                status: "READ",
                missed: 0,
            } as BLOCK_CONTENT_TYPE;
        });
    }, [dialogues]);


    return (
        <div className={classes.messages}>
            <SearchInput />
            <List title="Groups" content={GROUPS} />
            <List title="Recent" content={dialoguesToDisplay} />
            <Chat />
            {isLoading && <Loader />}
            {error && <Error message={error} />}
        </div>
    );
};

export default Messages;
