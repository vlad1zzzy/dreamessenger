import React from 'react';

import classes from './index.module.scss';

interface InputI {
    type: string,
    placeholder: string,
}

const Input: React.FC<InputI> = ({type, placeholder}) => (
    <input className={classes.input} type={type} placeholder={placeholder} />
);

export default Input;
