import React from 'react';

import Content from "./Content";
import Block from "../../UI/Block";
import Info from "./Info";
import Header from "../../UI/Header";
import { SETTINGS_TYPE } from "../../../store/temp";

interface MenuI {
    title: string;
    withHeader?: boolean;
    settings: SETTINGS_TYPE[];
}

const Menu: React.FC<MenuI> = ({ title, withHeader, settings }) => {
    return (
        <Block>
            <Header title={title} />
            {withHeader && <Info />}
            <Content settings={settings} />
        </Block>
    );
};

export default Menu;