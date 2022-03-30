import React from 'react';

import classes from './index.module.scss';
import SearchInput from "../../components/SearchInput";
import { FRIENDS, GROUPS } from "../../store/temp";
import List from "../../components/Blocks/List";

interface HomeI {

}

const Home: React.FC<HomeI> = ({}) => {

    return (
        <div className={classes.home}>
            <SearchInput />
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
