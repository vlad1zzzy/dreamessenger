import React, { MouseEventHandler } from 'react';

import Row from "./Row";

import classes from "./index.module.scss";

import { BLOCK_CONTENT_TYPE } from "../../../../store/temp";
import { useScrollTop } from "../../../../hooks/useScrollTop";

interface ContentI {
    content: BLOCK_CONTENT_TYPE[];
    onItemChoose: (_: number) => MouseEventHandler<HTMLDivElement>;
}

const Content: React.FC<ContentI> = ({ content, onItemChoose }) => {
    const { scrollTop, onScroll } = useScrollTop();

    return (
        <div
            className={`${classes.content} ${scrollTop > 0 ? classes["content--top"] : ''}`}
            onScroll={onScroll}
        >
            {content.map((item) => (<Row key={item.id} content={item} onItemChoose={onItemChoose}/>))}
        </div>
    );
};

export default Content;
