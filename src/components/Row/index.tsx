import React, { ChangeEvent } from 'react';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { changeUserAvatar } from "../../store/slices/user";

import { SETTINGS_TYPE } from "../../store/temp";

import Icon from "../UI/Icon";

import classes from "./index.module.scss";

interface RowI {
    content: SETTINGS_TYPE;
}

const Row: React.FC<RowI> = ({ content }) => {
    const dispatch = useDispatch<AppDispatch>();
    const onRowClick = () => {
        if (content.icon === 'add-photo') {
            const input = document.createElement('input');
            input.type = 'file';
            // @ts-ignore
            input.onchange = (e: ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0];
                if (file) {
                    const avatar = new FormData();
                    avatar.append('data', file);
                    dispatch(changeUserAvatar(avatar));
                }
            };

            input.click();
        }
    };

    return (
        <div className={classes.row} onClick={onRowClick}>
            <Icon name={content.icon} />
            <span className={classes.row__text}>{content.name}</span>
        </div>
    );
};

export default Row;
