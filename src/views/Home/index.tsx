import React, { useState } from 'react';
import List from "../../components/Blocks/List";
import SearchInput from "../../components/SearchInput";
import { FRIENDS, GROUPS } from "../../store/temp";

import classes from './index.module.scss';

interface HomeI {

}

const Home: React.FC<HomeI> = ({}) => {
    const [, setSuggests] = useState([]);

    return (
        <div className={classes.home}>
            <SearchInput setSuggests={setSuggests} />
            <List title="Groups" content={GROUPS} onItemChoose={() => () => {
            }} />
            <List title="Recent" content={FRIENDS} onItemChoose={() => () => {
            }} />
            <List title="Friends" content={FRIENDS} onItemChoose={() => () => {
            }} />
            <List title="Recent Calls" content={FRIENDS} onItemChoose={() => () => {
            }} />
        </div>
    );
};

export default Home;
