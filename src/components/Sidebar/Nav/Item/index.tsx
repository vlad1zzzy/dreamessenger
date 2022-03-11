import React from 'react';
import { NavLink } from "react-router-dom";

import Icon from "../../../UI/Icon";

import classes from './index.module.scss';

interface ItemI {
    iconName: string;
}

const Item: React.FC<ItemI> = ({ iconName }) => {

    return (
        <li className={`${classes.item} ${classes["item--active"]}`}>
            <NavLink to={iconName} className={({ isActive }) => (isActive ? classes["item--active"] : '')}>
                <span className={classes.item__backdrop}>
                    <span className={classes.item__state}>
                        <Icon name={iconName} size={"medium"} />
                    </span>
                </span>
            </NavLink>
        </li>
    );
};

export default Item;
