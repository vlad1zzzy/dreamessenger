import React from 'react';
import { useSelector } from "react-redux";

import img from "../../../assets/img/chat.png";
import { RootState } from "../../../store";
import { UserCredentials } from "../../../store/slices/user";
import Block from "../../UI/Block";
import Error from "../../UI/Error";
import Loader from "../../UI/Loader";
import Content from "./Content";

import classes from "./index.module.scss";
import Info from "./Info";
import Input from "./Input";

interface ChatI {
    user?: UserCredentials,
    dialogueId: number,
}

const Chat: React.FC<ChatI> = ({ user, dialogueId }) => {
    const { isLoading, error, messages } = useSelector((state: RootState) => state.currentDialogue);


    if (!user) {
        return <Block><img src={img} alt={'Chat'} className={classes.image} /></Block>;
    }

    return (
        <Block>
            <Info
                first_name={user.first_name || "Noname"}
                last_name={user.last_name || "Noname"}
                avatar={user.info.avatar?.link}
                online={true}
            />
            <Content messages={messages} user={user} />
            <Input dialogueId={dialogueId} />
            {isLoading && <Loader />}
            {error && <Error message={error} />}
        </Block>
    );
};

export default Chat;