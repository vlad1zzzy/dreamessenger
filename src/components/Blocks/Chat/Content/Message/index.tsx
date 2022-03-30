import React from 'react';

import classes from "./index.module.scss";


interface MessageI {

}

const Message: React.FC<MessageI> = ({  }) => {

    return (
        <div className={classes.message}>

        </div>
    );
};

export default Message;
