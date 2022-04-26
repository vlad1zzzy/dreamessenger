import React from 'react';
import Icon from "../UI/Icon";

import classes from "./index.module.scss";

interface PressableI {
    iconName: string;
    size?: "big";
    onClick?: () => void;
}

const Pressable: React.FC<PressableI> = ({ iconName, size, onClick }) => {
    return (
        <div className={classes.backdrop} onClick={onClick}>
            <Icon name={iconName} size={size} />
        </div>
    );
};

export default Pressable;
