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
import { clearError, createDialogue, getDialogues } from "../../store/slices/dialogues";
import { initialUsers, Users } from "../../store/slices/user";

import { BLOCK_CONTENT_TYPE } from "../../store/temp";

import classes from './index.module.scss';

interface MessagesI {

}

const Messages: React.FC<MessagesI> = ({}) => {
    const [currentDialogId, setCurrentDialogId] = useState(-1);
    const [showSuggests, setShowSuggests] = useState(false);
    const [suggests, setSuggests] = useState<Users>(initialUsers);
    const { dialogues, isLoading, error } = useSelector((state: RootState) => state.dialogues);
    const isLoadingUser = useSelector((state: RootState) => state.user.isLoading);
    const username = useSelector((state: RootState) => state.user.credentials.username);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isLoadingUser) {
            dispatch(getDialogues());
        }
    }, [isLoadingUser]);

    const currentDialogUser = useMemo(() => {
        if (currentDialogId) {
            const dialog = dialogues?.results?.find((dialog) => dialog.id === currentDialogId);

            return dialog?.users.find((user) => user.username !== username);
        }
    }, [currentDialogId, dialogues]);


    useError(error, clearError);

    const suggestsToDisplay = useMemo(() => {
        return suggests.results.map((suggest, index) => {
            const { username, first_name, last_name, info } = suggest;
            return {
                id: index,
                avatar: info.avatar?.link,
                title: username,
                subtitle: `${first_name} ${last_name}`,
            } as BLOCK_CONTENT_TYPE;
        });
    }, [suggests]);

    const onSuggestChoose = (id: number) => (e: SyntheticEvent) => {
        const username = suggestsToDisplay[id].title;
        const dialogue = dialoguesToDisplay.find((dialogue) => dialogue.title === username);
        if (dialogue === undefined) {
            dispatch(createDialogue(username));
        } else {
            onDialogueChoose(dialogue.id)(e)
        }
    };

    const dialoguesToDisplay = useMemo(() => {
        return dialogues?.results.map((dialog) => {
            const { username, first_name, last_name, info } = dialog.users[0];
            return {
                id: dialog.id,
                avatar: info.avatar?.link,
                title: username,
                subtitle: `${first_name} ${last_name}`,
                online: false,
                time: "(time)",
                status: "READ",
                missed: 0,
            } as BLOCK_CONTENT_TYPE;
        }) || [];
    }, [dialogues]);

    const onDialogueChoose = (id: number) => (_: SyntheticEvent) => {
        dispatch(getDialogueMessages(id));
        setCurrentDialogId(id);
    };

    const onRemoveSuggests = () => {
        setShowSuggests(false);
        setSuggests(initialUsers);
    };

    return (
        <div className={`${classes.messages} ${showSuggests && classes.messages__suggests}`}>
            <SearchInput setSuggests={setSuggests} setShowSuggests={setShowSuggests} />
            <List
                title="Suggests"
                content={suggestsToDisplay}
                iconName="cross"
                onItemChoose={onSuggestChoose}
                onIconClick={onRemoveSuggests}
            />
            <List title="Recent" content={dialoguesToDisplay} onItemChoose={onDialogueChoose} />
            <Chat user={currentDialogUser} dialogueId={currentDialogId} />
            {isLoading && <Loader />}
            {error && <Error message={error} />}
        </div>
    );
};

export default Messages;
