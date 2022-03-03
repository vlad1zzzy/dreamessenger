import React from 'react';

import classes from "./index.module.scss";

const Block: React.FC = ({children}) => {
    return (
        <div className={classes.block}>
            {children}
        </div>
    );
};

export default Block;