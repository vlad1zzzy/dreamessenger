import React, { MouseEventHandler } from 'react';

import { BLOCK_CONTENT_TYPE } from "../../../store/temp";
import Block from "../../UI/Block";
import Header from "../../UI/Header";

import Content from "./Content";

interface ListI {
    title: string,
    content: BLOCK_CONTENT_TYPE[],
    iconName?: string,
    onItemChoose: (_: any) => MouseEventHandler<HTMLDivElement>,
    onIconClick?: () => void,
}

const List: React.FC<ListI> = ({ iconName, title, content, onItemChoose, onIconClick }) => {
    return (
        <Block>
            <Header title={title} iconName={iconName || "options"} onIconClick={onIconClick} />
            <Content content={content} onItemChoose={onItemChoose} />
        </Block>
    );
};

export default List;