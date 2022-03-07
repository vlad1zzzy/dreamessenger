import React from 'react';

import Content from "./Content";
import Header from "../../UI/Header";
import Block from "../../UI/Block";

import { BLOCK_CONTENT_TYPE } from "../../../store/temp";

interface ListI {
    title: string,
    content: BLOCK_CONTENT_TYPE[],
}

const List: React.FC<ListI> = ({title, content}) => {
    return (
        <Block>
            <Header title={title} iconName={"options"} />
            <Content content={content} />
        </Block>
    );
};

export default List;