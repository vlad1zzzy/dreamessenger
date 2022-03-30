import React from 'react';
import Input from "../../../UI/Input";

import classes from "./index.module.scss";


interface ChatInputI {

}

const ChatInput: React.FC<ChatInputI> = ({}) => {

    return (
        <div className={classes.input}>
            <div className={classes.input__field}>
                <Input placeholder="Start typing..." type="text" />
            </div>
        </div>
    );
};

export default ChatInput;