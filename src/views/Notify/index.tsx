import React, { useState } from 'react';
import Notifies from "../../components/Blocks/Notifies";

import SearchInput from "../../components/SearchInput";

import { NOTIFIES } from "../../store/temp";

import classes from './index.module.scss';

interface NotifyI {

}

const Notify: React.FC<NotifyI> = ({}) => {
    const [, setSuggests] = useState([]);

    return (
        <div className={classes.notify}>
            <SearchInput setSuggests={setSuggests} />
            <Notifies content={NOTIFIES} />
        </div>
    );
};

export default Notify;
