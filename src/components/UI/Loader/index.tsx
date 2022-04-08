import React from 'react';
import ReactDOM from 'react-dom';

import classes from "./index.module.scss";


const Loader: React.FC = ({}) => {
    return ReactDOM.createPortal(
        <>
            <div className={classes.background} />
            <div className={classes.loader}>
                <div>
                    <div>
                        <div />
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('loader')!
    );
};

export default Loader;