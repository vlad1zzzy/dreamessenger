import React, { ChangeEventHandler } from 'react';

import classes from './index.module.scss';

interface InputI {
    type: string,
    value: string,
    placeholder: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
}

const Input: React.FC<InputI> = ({ type, value, placeholder, onChange }) => (
    <input className={classes.input} type={type} placeholder={placeholder} value={value} onChange={onChange}/>
);

export default Input;
