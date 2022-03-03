import React from 'react';

import classes from './index.module.scss';

interface TitleI {
    title: string;
}

const Title: React.FC<TitleI> = ({title}) => {
    return (
        <h3 className={classes.title}>
            {title}
        </h3>
    );
};

export default Title;