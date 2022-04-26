import React from 'react';
import Pressable from "../../Pressable";

import Title from "../Title";

import classes from "./index.module.scss";

interface HeaderI {
    title: string,
    iconName?: string,
    onIconClick?: () => void,
}

const Header: React.FC<HeaderI> = ({ title, iconName, onIconClick }) => {
    return (
        <div className={classes.header}>
            <Title title={title} />
            {iconName && <Pressable iconName={iconName} onClick={onIconClick} />}
        </div>
    );
};

export default Header;