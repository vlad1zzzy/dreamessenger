import React from 'react';

import Title from "../Title";
import Pressable from "../../Pressable";

import classes from "./index.module.scss";

interface HeaderI {
    title: string,
    iconName?: string,
}

const Header: React.FC<HeaderI> = ({ title, iconName }) => {
    return (
        <div className={classes.header}>
            <Title title={title} />
            {iconName && <Pressable iconName={iconName} onClick={() => console.log("header")} />}
        </div>
    );
};

export default Header;