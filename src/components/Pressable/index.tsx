import React from 'react';

import classes from "./index.module.scss";
import Icon from "../UI/Icon";

interface PressableI {
    iconName: string;
    size?: "big";
    onClick: () => void;
}

const Pressable: React.FC<PressableI> = ({iconName, size, onClick}) => {
    return (
        <div className={classes.backdrop} onClick={onClick}>
            <Icon name={iconName} size={size}/>
        </div>
    );
}

export default Pressable;
