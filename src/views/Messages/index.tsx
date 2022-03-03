import React from 'react';

import classes from './index.module.scss';
import SearchInput from "../../components/SearchInput";
import List from "../../components/Blocks/List";
import Chat from "../../components/Blocks/Chat";

import {FRIENDS, GROUPS} from "../../store/temp";

interface MessagesI {

}

const Messages: React.FC<MessagesI> = ({}) => {

    return (
        <div className={classes.messages}>
            <SearchInput/>
            <List title="Groups" content={GROUPS}/>
            <List title="Recent" content={FRIENDS}/>
            <Chat />
        </div>
    );
};

export default Messages;
