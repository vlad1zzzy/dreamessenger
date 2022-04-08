import React from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { logoutUser } from "../../store/slices/user";
import Pressable from "../Pressable";

import Avatar from "../UI/Avatar";

import classes from "./index.module.scss";
import Nav from "./Nav";

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
