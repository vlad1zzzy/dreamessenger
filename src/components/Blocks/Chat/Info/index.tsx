import React from 'react';
import Pressable from "../../../Pressable";
import Avatar from "../../../UI/Avatar";

import classes from "./index.module.scss";

interface InfoI {
    first_name: string,
    last_name: string,
    online?: boolean,
}

const Info: React.FC<InfoI> = ({ first_name, last_name, online }) => {

    return (
        <div className={classes.header}>
            <Avatar id="00" size="big" online={online} />
            <div className={classes.header__info}>
                <div className={classes.header__name}>{`${first_name} ${last_name}`}</div>
                <div className={classes.header__status}>{online ? "Online" : "Offline"}</div>
            </div>
            <Pressable iconName="options" onClick={() => {
                console.log("OPTIONS");
            }} />
        </div>
    );
};

export default Info;