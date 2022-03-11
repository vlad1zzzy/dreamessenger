import React from 'react';

import classes from './index.module.scss';

import img from '../../../assets/img/00.png';
import Icon from "../Icon";

interface ErrorI {
    message: string,
}

const Error: React.FC<ErrorI> = ({ message }) => {

    return (
        <div className={classes.error}>
            {message}
        </div>
    );
};

export default Error;