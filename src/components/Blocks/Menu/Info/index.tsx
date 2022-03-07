import React from 'react';

import classes from "./index.module.scss";
import Avatar from "../../../UI/Avatar";
import Icon from "../../../UI/Icon";

interface InfoI {

}

const Info: React.FC<InfoI> = ({}) => {
    return (
        <div className={classes.header}>
            <Avatar id="00" size="big" />
            <div className={classes.header__info}>
                <div className={classes.header__name}>Krishna</div>
                <div className={classes.header__status}>Stay home stay safe</div>
            </div>
            <Icon name="qrcode" />
        </div>
    );
};

export default Info;