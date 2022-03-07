import React from 'react';

import Row from "../../Row";
import Block from "../../UI/Block";

import { NOTIFY } from "../../../store/temp";

import classes from "./index.module.scss";

interface NotifiesI {
    content: NOTIFY[],
}

const Notifies: React.FC<NotifiesI> = ({content}) => {

    return (
        <Block>
            <div className={classes.notifies}>
                {content.map((el) => (
                    <Row content={{...el, path: '/notify/:id', icon: 'notification'}} key={el.id} />
                ))}
            </div>
        </Block>
    );
};

export default Notifies;