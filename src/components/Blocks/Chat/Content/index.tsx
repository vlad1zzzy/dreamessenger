import React, { useEffect, useRef } from 'react';

import fallbackPicture from "../../../../assets/img/fail_to_load_picture.png";
import { Messages } from "../../../../store/slices/dialogue";
import { UserCredentials } from "../../../../store/slices/user";

import classes from "./index.module.scss";
import Message from "./Message";


interface ContentI {
    messages: Messages;
    user: UserCredentials,
}

const Content: React.FC<ContentI> = ({ messages, user }) => {
    const chatContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainer.current) {
            const scroll = chatContainer.current.scrollHeight - chatContainer.current.clientHeight;
            chatContainer.current.scrollTo(0, scroll);
        }
    }, [messages]);

    return (
        <div className={classes.content} ref={chatContainer}>
            {messages.results.map((message) => <Message
                key={message.id}
                src={message.picture?.link || fallbackPicture}
                from={message.from_user.username === user.username}
                createdAt={message.created_at}
                fail={!message.picture?.link}
            />)}
        </div>
    );
};

export default Content;
