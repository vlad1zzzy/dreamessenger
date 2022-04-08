import React from 'react';
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import './App.scss';
import Sidebar from "./components/Sidebar";
import Loader from "./components/UI/Loader";
import { RootState } from "./store";
import Home from "./views/Home";
import Login from "./views/Login";
import Messages from "./views/Messages";
import Notify from "./views/Notify";
import Settings from "./views/Settings";


const App: React.FC = () => {
    const { isAuth, isLoading } = useSelector((state: RootState) => state.user);

    const view =
        isAuth
            ?
            <div className="container">
                <Sidebar />
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/notify" element={<Notify />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<Navigate to="/home" />} />
                </Routes>
            </div>
            :
            <Routes>
                <Route path="/login" element={<Login isLogin={true} />} />
                <Route path="/sign-in" element={<Login isLogin={false} />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>;

    return (
        <>
            {view}
            {isLoading && <Loader />}
        </>
    );
};

export default App;
