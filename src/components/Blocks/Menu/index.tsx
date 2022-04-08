import React from 'react';
import { SETTINGS_TYPE } from "../../../store/temp";
import Block from "../../UI/Block";
import Header from "../../UI/Header";

import Content from "./Content";
import Info from "./Info";

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