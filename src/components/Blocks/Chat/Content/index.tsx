import React from 'react';

import classes from "./index.module.scss";


interface ContentI {

}

const Content: React.FC<ContentI> = ({  }) => {

    return (
        <div className={classes.content}>
            content
        </div>
    );
};

export default Content;
