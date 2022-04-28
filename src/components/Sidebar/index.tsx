import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { logoutUser } from "../../store/slices/user";
import Pressable from "../Pressable";

import Avatar from "../UI/Avatar";

import classes from "./index.module.scss";
import Nav from "./Nav";

interface SidebarI {

}

const Sidebar: React.FC<SidebarI> = ({}) => {
    const userAvatar = useSelector((state: RootState) => state.user.credentials.info?.avatar?.link);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(logoutUser());
        navigate("/login");
    };

    return (
        <div className={classes.sidebar}>
            <Avatar size={"big"} link={userAvatar} />
            <Nav />
            <Pressable iconName={"outdoor"} size={"big"} onClick={logout} />
        </div>
    );
};

export default Sidebar;
