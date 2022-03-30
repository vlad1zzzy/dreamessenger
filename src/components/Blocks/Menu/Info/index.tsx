import React from 'react';

import classes from "./index.module.scss";
import Avatar from "../../../UI/Avatar";
import Icon from "../../../UI/Icon";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

interface InfoI {

}

const Info: React.FC<InfoI> = ({}) => {
    const {first_name, last_name} = useSelector((state: RootState) => state.user.credentials)

    return (
        <div className={classes.header}>
            <Avatar id="00" size="big" />
            <div className={classes.header__info}>
                <div className={classes.header__name}>{`${first_name} ${last_name}`}</div>
                <div className={classes.header__status}>Stay home stay safe</div>
            </div>
            <Icon name="qrcode" />
        </div>
    );
};

export default Info;