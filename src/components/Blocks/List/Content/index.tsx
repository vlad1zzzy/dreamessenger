import React, { MouseEventHandler } from 'react';
import { useScrollTop } from "../../../../hooks/useScrollTop";

import { BLOCK_CONTENT_TYPE } from "../../../../store/temp";

import classes from "./index.module.scss";

import Row from "./Row";

interface ContentI {
    content: BLOCK_CONTENT_TYPE[];
    onItemChoose: (_: any) => MouseEventHandler<HTMLDivElement>;
}

const Content: React.FC<ContentI> = ({ content, onItemChoose }) => {
    const { scrollTop, onScroll } = useScrollTop();

    return (
        <div
            className={`${classes.content} ${scrollTop > 0 ? classes["content--top"] : ''}`}
            onScroll={onScroll}
        >
            {content.length ?
                content.map((item) => (<Row key={item.id} content={item} onItemChoose={onItemChoose} />))
                : "No content yet"
            }
        </div>
    );
};

export default Content;
