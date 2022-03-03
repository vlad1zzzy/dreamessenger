import React from 'react';

import SearchInput from "../../components/SearchInput";
import Menu from "../../components/Blocks/Menu";

import classes from './index.module.scss';

import {PROFILE_SETTINGS, ACCOUNT_SETTINGS} from "../../store/temp";

interface SettingsI {

}

const Settings: React.FC<SettingsI> = ({}) => {

    return (
        <div className={classes.settings}>
            <SearchInput/>
            <Menu title="Profile Settings" withHeader settings={PROFILE_SETTINGS}/>
            <Menu title="Account Settings" settings={ACCOUNT_SETTINGS}/>
        </div>
    );
};

export default Settings;
