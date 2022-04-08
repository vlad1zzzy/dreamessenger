import React from 'react';

import img from '../../../assets/img/00.png';
import Icon from "../Icon";

import classes from './index.module.scss';

interface AvatarI {
    id: string;
    size?: "mini" | "default" | "big";
    online?: boolean,
}

const Avatar: React.FC<AvatarI> = ({ id, size = "default", online = false }) => {

    return (
        <div className={`${classes.avatar} ${classes[`avatar_${size}`]}`}>
            <img className={classes.avatar__img} src={img} alt="Avatar" />
            {online && <Icon name="online" />}
        </div>
    );
};

export default Avatar;