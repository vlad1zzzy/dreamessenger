import React from 'react';

import Row from "./Row";

import classes from "./index.module.scss";

import { BLOCK_CONTENT_TYPE } from "../../../../store/temp";
import { useScrollTop } from "../../../../hooks/useScrollTop";

interface ContentI {
    content: BLOCK_CONTENT_TYPE[];
}

const Content: React.FC<ContentI> = ({ content }) => {
    const { scrollTop, onScroll } = useScrollTop();

    return (
        <div
            className={`${classes.content} ${scrollTop > 0 ? classes["content--top"] : ''}`}
            onScroll={onScroll}
        >
            {content.map((item, id) => (<Row key={item.title + id} content={item} />))}
        </div>
    );
};

export default Content;
