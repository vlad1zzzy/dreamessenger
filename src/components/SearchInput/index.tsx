import React from 'react';
import Input from '../UI/Input';

import classes from "./index.module.scss";
import Pressable from "../Pressable";
import Block from "../UI/Block";

const SearchInput: React.FC = () => {
    return (
        <Block>
            <div className={classes.search}>
                <Pressable iconName="search" onClick={() => console.log("search")} />
                <Input type="text" placeholder="Search" />
                <Pressable iconName="options" onClick={() => console.log("options")} />
            </div>
        </Block>
    );
};

export default SearchInput;
