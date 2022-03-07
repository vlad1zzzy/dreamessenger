import React from 'react';

import classes from "./index.module.scss";


const Cubes: React.FC = ({}) => {
    return (
        <>
            <div className={classes.cube} />
            <div className={classes.cube} />
            <div className={classes.cube} />
            <div className={classes.cube} />
            <div className={classes.cube} />
            <div className={classes.cube} />
        </>
    );
};

export default Cubes;