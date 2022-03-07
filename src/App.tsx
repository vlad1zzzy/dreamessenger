import React from 'react';
import { Navigate, Route, Routes, } from "react-router-dom";
import './App.scss';
import Home from "./views/Home";
import Sidebar from "./components/Sidebar";
import Messages from "./views/Messages";
import Notify from "./views/Notify";
import Settings from "./views/Settings";
import Login from "./views/Login";
import { useToken } from "./hooks/useToken";

const App: React.FC = () => {
    const {token, setToken, removeToken} = useToken('user');

    // if (isLoading) {
    //     return <Loader/>
    // }

    if (!token) {
        return (
            <Routes>
                <Route path="/login" element={<Login setUser={setToken} isLogin={true} />} />
                <Route path="/sign-in" element={<Login setUser={setToken} isLogin={false} />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        );
    }

    return (
        <>
            <div className="container">
                <Sidebar removeUser={removeToken} />
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/notify" element={<Notify />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<Navigate to="/home" />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
