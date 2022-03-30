import React, { SyntheticEvent, useEffect, useMemo, useState } from 'react';

import classes from './index.module.scss';
import SearchInput from "../../components/SearchInput";
import List from "../../components/Blocks/List";
import Chat from "../../components/Blocks/Chat";

import { BLOCK_CONTENT_TYPE, FRIENDS, GROUPS } from "../../store/temp";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { getDialogues, clearError, getDialogueMessages } from "../../store/slices/dialogues";
import Loader from "../../components/UI/Loader";
import Error from "../../components/UI/Error";
import { useError } from "../../hooks/useError";

interface MessagesI {

}

const Messages: React.FC<MessagesI> = ({}) => {
    const [currentDialogId, setCurrentDialogId] = useState(2);
    const { dialogues, isLoading, error } = useSelector((state: RootState) => state.dialogues);
    const username = useSelector((state: RootState) => state.user.credentials.username);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDialogues());
        dispatch(getDialogueMessages(1));
    }, []);

    const currentDialogUser = useMemo(() => {
        if (currentDialogId) {
            const dialog = dialogues.results.find((dialog) => dialog.id === currentDialogId);

            return dialog?.users.find((user) => user.username !== username);
        }
    }, [currentDialogId, dialogues]);


    useError(error, clearError);

    const dialoguesToDisplay = useMemo(() => {
        return dialogues.results.map((dialog) => {
            return {
                id: dialog.id,
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

    const onDialogueChoose = (id: number) => (_: SyntheticEvent) => {
        setCurrentDialogId(id)
    };


    return (
        <div className={classes.messages}>
            <SearchInput />
            <List title="Groups" content={GROUPS} onItemChoose={onDialogueChoose} />
            <List title="Recent" content={dialoguesToDisplay} onItemChoose={onDialogueChoose} />
            <Chat user={currentDialogUser} />
            {isLoading && <Loader />}
            {error && <Error message={error} />}
        </div>
    );
};

export default Messages;
