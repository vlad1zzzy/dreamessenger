import React from 'react';
import Notifies from "../../components/Blocks/Notifies";

import SearchInput from "../../components/SearchInput";

import { NOTIFIES } from "../../store/temp";

import classes from './index.module.scss';

interface NotifyI {

}

const Notify: React.FC<NotifyI> = ({}) => {

    return (
        <div className={classes.notify}>
            <SearchInput />
            <Notifies content={NOTIFIES} />
        </div>
    );
};

export default Notify;
