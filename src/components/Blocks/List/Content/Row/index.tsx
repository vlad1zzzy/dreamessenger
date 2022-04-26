import React, { MouseEventHandler } from 'react';

import { BLOCK_CONTENT_TYPE } from "../../../../../store/temp";
import Avatar from "../../../../UI/Avatar";
import Icon from "../../../../UI/Icon";

import classes from "./index.module.scss";

interface RowI {
    content: BLOCK_CONTENT_TYPE;
    onItemChoose: (_: any) => MouseEventHandler<HTMLDivElement>;
}

const Row: React.FC<RowI> = ({ content, onItemChoose }) => {

    return (
        <div className={classes.row} onClick={onItemChoose(content.id)}>
            <Avatar link={content.avatar} online={content.online} />
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
