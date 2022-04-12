import React, { SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Chat from "../../components/Blocks/Chat";
import List from "../../components/Blocks/List";
import SearchInput from "../../components/SearchInput";
import Error from "../../components/UI/Error";
import Loader from "../../components/UI/Loader";
import { useError } from "../../hooks/useError";
import { RootState } from "../../store";
import { getDialogueMessages } from "../../store/slices/dialogue";
import { clearError, getDialogues } from "../../store/slices/dialogues";

import { BLOCK_CONTENT_TYPE, GROUPS } from "../../store/temp";

import classes from './index.module.scss';

interface MessagesI {

}

const Messages: React.FC<MessagesI> = ({}) => {
    const [currentDialogId, setCurrentDialogId] = useState(-1);
    const { dialogues, isLoading, error } = useSelector((state: RootState) => state.dialogues);
    const username = useSelector((state: RootState) => state.user.credentials.username);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDialogues());
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
                subtitle: "(message)",
                online: false,
                time: "(time)",
                status: "READ",
                missed: 0,
            } as BLOCK_CONTENT_TYPE;
        });
    }, [dialogues]);

    const onDialogueChoose = (id: number) => (_: SyntheticEvent) => {
        dispatch(getDialogueMessages(id));
        setCurrentDialogId(id);
    };


    return (
        <div className={classes.messages}>
            <SearchInput />
            <List title="Groups" content={GROUPS} onItemChoose={onDialogueChoose} />
            <List title="Recent" content={dialoguesToDisplay} onItemChoose={onDialogueChoose} />
            <Chat user={currentDialogUser} dialogueId={currentDialogId} />
            {isLoading && <Loader />}
            {error && <Error message={error} />}
        </div>
    );
};

export default Messages;
