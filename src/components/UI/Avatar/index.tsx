import React from 'react';

import img from '../../../assets/img/fail_to_load_picture.png';

import classes from './index.module.scss';

interface AvatarI {
    size?: "mini" | "default" | "big";
    online?: boolean,
    link?: string,
}

const Avatar: React.FC<AvatarI> = ({ size = "default", link }) => {


    return (
        <div className={`${classes.avatar} ${classes[`avatar_${size}`]}`}>
            <img className={classes.avatar__img} src={link || img} alt="Avatar" />
            {/*{online && <Icon name="online" />}*/}
        </div>
    );
};

export default Avatar;