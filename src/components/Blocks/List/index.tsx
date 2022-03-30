import React, { MouseEventHandler } from 'react';

import Content from "./Content";
import Header from "../../UI/Header";
import Block from "../../UI/Block";

import { BLOCK_CONTENT_TYPE } from "../../../store/temp";

interface ListI {
    title: string,
    content: BLOCK_CONTENT_TYPE[],
    onItemChoose: (_: number) => MouseEventHandler<HTMLDivElement>;
}

const List: React.FC<ListI> = ({ title, content, onItemChoose }) => {
    return (
        <Block>
            <Header title={title} iconName={"options"} />
            {content.length ? <Content content={content} onItemChoose={onItemChoose} /> : "No content yet"}
        </Block>
    );
};

export default List;