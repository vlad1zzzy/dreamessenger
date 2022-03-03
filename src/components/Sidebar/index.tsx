import React from 'react';

import Avatar from "../UI/Avatar";
import Nav from "./Nav";
import Pressable from "../Pressable";

import classes from "./index.module.scss";

interface SidebarI {
    removeUser: () => void;
}

const Sidebar: React.FC<SidebarI> = ({removeUser}) => {

    const logout = async () => {
        removeUser();
    }

    return (
        <div className={classes.sidebar}>
            <Avatar id={"01"} size={"big"}/>
            <Nav />
            <Pressable iconName={"outdoor"} size={"big"} onClick={logout}/>
        </div>
    );
}

export default Sidebar;
