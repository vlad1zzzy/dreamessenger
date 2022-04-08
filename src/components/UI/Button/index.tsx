import React from 'react';

import classes from './index.module.scss';

interface ButtonI {
    title: string,
    subtitle: string,
}

const Button: React.FC<ButtonI> = ({ title, subtitle }) => (
    <button type="submit" className={classes.button}><span>{subtitle}</span><span>{title}</span></button>
);

export default Button;
