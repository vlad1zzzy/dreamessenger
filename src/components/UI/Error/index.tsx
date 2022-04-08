import React from 'react';

import classes from './index.module.scss';

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