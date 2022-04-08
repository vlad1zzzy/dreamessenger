import React from 'react';
import { SETTINGS_TYPE } from "../../../../store/temp";

import Row from "../../../Row";

import classes from "./index.module.scss";

interface ContentI {
    settings: SETTINGS_TYPE[];
}

const Content: React.FC<ContentI> = ({ settings }) => {

    return (
        <div className={classes.content}>
            {settings.map((el, ind) => (<Row content={el} key={ind} />))}
        </div>

    );
};

export default Content;
