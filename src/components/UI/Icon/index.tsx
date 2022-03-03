import React from 'react';

import classes from './index.module.scss';

interface IconI {
    name: string;
    size?: "big" | "medium";
}

const Icon: React.FC<IconI> = ({name, size}) => {

    return (
        <svg className={`${classes.icon} ${size && classes[`icon--${size}`]}`} xmlns="http://www.w3.org/2000/svg">
            <use
                href={`/assets/icons/_sprite.svg#icon-${name}-usage`}
                xlinkHref={`/assets/icons/_sprite.svg#icon-${name}-usage`}
            />
        </svg>
    );
};

export default Icon;
