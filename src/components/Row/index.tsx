import React from 'react';
import { useNavigate } from 'react-router-dom';

import { SETTINGS_TYPE } from "../../store/temp";

import Icon from "../UI/Icon";

import classes from "./index.module.scss";

interface RowI {
    content: SETTINGS_TYPE;
}

const Row: React.FC<RowI> = ({ content }) => {
    const navigate = useNavigate();

    const onRowClick = () => {
        navigate(content.path.replace(":id", "1"));
    };

    return (
        <div className={classes.row} onClick={onRowClick}>
            <Icon name={content.icon} />
            <span className={classes.row__text}>{content.name}</span>
        </div>
    );
};

export default Row;
