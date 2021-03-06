import React from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import Avatar from "../../../UI/Avatar";
import Icon from "../../../UI/Icon";

import classes from "./index.module.scss";

interface InfoI {

}

const Info: React.FC<InfoI> = ({}) => {
    const { first_name, last_name, info: { avatar } } = useSelector((state: RootState) => state.user.credentials);

    return (
        <div className={classes.header}>
            <Avatar link={avatar?.link} size="big" />
            <div className={classes.header__info}>
                <div className={classes.header__name}>{`${first_name} ${last_name}`}</div>
                <div className={classes.header__status}>Stay home stay safe</div>
            </div>
            <Icon name="qrcode" />
        </div>
    );
};

export default Info;