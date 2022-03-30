import React from 'react';
import Block from "../../UI/Block";

import classes from './index.module.scss';
import Info from "./Info";
import { UserCredentials } from "../../../store/slices/user";
import Content from "./Content";
import Input from "./Input";

interface ChatI {
    user?: UserCredentials,
}

const Chat: React.FC<ChatI> = ({ user }) => {

    if (!user) {
        return <Block>Choose the chat</Block>;
    }

    return (
        <div className={classes.chat}>
            <Info first_name={user.first_name} last_name={user.last_name} online={true} />
            <Content />
            <Input />
        </div>
    );
};

export default Chat;