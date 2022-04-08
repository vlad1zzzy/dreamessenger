import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { timeSince } from "../../../../../utils/date";
import { getRandomInt } from "../../../../../utils/random";

import classes from "./index.module.scss";


interface MessageI {
    src: string,
    from: boolean,
    createdAt: string,
    fail: boolean,
}

const Message: React.FC<MessageI> = ({ src, from, createdAt, fail }) => {
    const [time, setTime] = useState<string>(timeSince(createdAt));

    useEffect(() => {
        const id = setInterval(() => {
            setTime(timeSince(createdAt));
        }, getRandomInt(6, 18) * 1000);

        return () => {
            clearInterval(id);
        };
    }, [createdAt]);

    return (
        <div
            className={`${classes.message} ${from ? classes.message__left : classes.message__right} ${fail && classes.message__fail}`}
        >
            <div className={classes.message__wrapper}>
                <LazyLoadImage
                    className={classes.message__image}
                    src={src}
                    alt="Message"
                />
            </div>
            <div className={classes.message__info}>{time}</div>
        </div>
    );
};

export default Message;
