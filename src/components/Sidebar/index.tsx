import React from 'react';

import Avatar from "../UI/Avatar";
import Nav from "./Nav";
import Pressable from "../Pressable";

import classes from "./index.module.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/slices/user";

interface SidebarI {

}

const Sidebar: React.FC<SidebarI> = ({}) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(logoutUser());
        navigate("/login");
    };

    return (
        <div className={classes.sidebar}>
            <Avatar id={"01"} size={"big"} />
            <Nav />
            <Pressable iconName={"outdoor"} size={"big"} onClick={logout} />
        </div>
    );
};

export default Sidebar;
