import React from 'react';

import SearchInput from "../../components/SearchInput";
import Notifies from "../../components/Blocks/Notifies";

import classes from './index.module.scss';

import { NOTIFIES } from "../../store/temp";

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
