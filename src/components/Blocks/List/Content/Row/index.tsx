import React, { MouseEventHandler } from 'react';

import classes from "./index.module.scss";
import Avatar from "../../../../UI/Avatar";
import Icon from "../../../../UI/Icon";

import { BLOCK_CONTENT_TYPE } from "../../../../../store/temp";

interface RowI {
    content: BLOCK_CONTENT_TYPE;
    onItemChoose: (_: number) => MouseEventHandler<HTMLDivElement>
}

const Row: React.FC<RowI> = ({ content, onItemChoose }) => {
    return (
        <div className={classes.row} onClick={onItemChoose(content.id)}>
            <Avatar id={content.avatar} online={content.online} />
            <div className={classes.row__main}>
                <div className={classes.row__mainTitle}>{content.title}</div>
                <div className={classes.row__mainSubtitle}>{content.subtitle}</div>
            </div>
            <div className={classes.row__info}>
                {content.time && <div className={classes.row__infoTop}>{content.time}</div>}
                {content.status && <div className={classes.row__infoBottom}><Icon name={'send-start'} /></div>}
            </div>
        </div>
    );
};

export default Row;
