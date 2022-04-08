import React, { ChangeEventHandler, FormEventHandler, useRef, useState } from 'react';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import { sendMessage } from "../../../../store/slices/dialogue";
import Button from "../../../UI/Button";

import classes from './index.module.scss';

interface ChatInputI {
    dialogueId: number,
}


const ChatInput: React.FC<ChatInputI> = ({ dialogueId }) => {
    const [inputText, setInputText] = useState("⭳");
    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit: FormEventHandler = async (event) => {
        event.preventDefault();
        if (inputRef.current?.files?.length) {
            const files = new FormData();
            files.append('data', inputRef.current.files[0]);
            dispatch(sendMessage({ dialogueId, files }));
        }
    };

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const filesCount = event.target.files?.length || 0;

        if (filesCount === 1) {
            setInputText(event.target.files![0].name);
        } else {
            setInputText(`⭳ (${filesCount})`);
        }
    };


    return (
        <form method="post" encType="multipart/form-data" onSubmit={handleSubmit} className={classes.form}>
            <fieldset className={classes.field}>
                <span className={classes.fake}>Choose files</span>
                <span className={classes.message}>{inputText}</span>
                <input type="file" name="data" accept=".jpg, .jpeg, .png" multiple
                       ref={inputRef}
                       className={classes.input}
                       onChange={handleChange}
                />
            </fieldset>
            <Button title="send" subtitle="➤" />
        </form>
    );
};

export default ChatInput;