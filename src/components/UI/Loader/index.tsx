import React from 'react';

import classes from "./index.module.scss";


const Loader: React.FC = ({}) => {
    return (
        <div className={classes.loader}>
            <div>
                <div>
                    <div />
                </div>
            </div>
        </div>
    );
};

export default Loader;