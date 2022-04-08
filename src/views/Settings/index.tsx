import React from 'react';
import Menu from "../../components/Blocks/Menu";

import SearchInput from "../../components/SearchInput";

import { ACCOUNT_SETTINGS, PROFILE_SETTINGS } from "../../store/temp";

import classes from './index.module.scss';

interface SettingsI {

}

const Settings: React.FC<SettingsI> = ({}) => {

    return (
        <div className={classes.settings}>
            <SearchInput />
            <Menu title="Profile Settings" withHeader settings={PROFILE_SETTINGS} />
            <Menu title="Account Settings" settings={ACCOUNT_SETTINGS} />
        </div>
    );
};

export default Settings;
