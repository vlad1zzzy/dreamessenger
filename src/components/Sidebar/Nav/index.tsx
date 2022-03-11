import React from 'react';

import NavItem from "./Item";

import classes from "./index.module.scss";

const items = ["home", "messages", "notify", "settings"];

interface NavI {

}

const Nav: React.FC<NavI> = ({}) => {

    return (
        <nav>
            <ul className={classes.nav}>
                {items.map((name) =>
                    <NavItem
                        key={name}
                        iconName={name}
                    />
                )}
            </ul>
        </nav>
    );
};

export default Nav;
