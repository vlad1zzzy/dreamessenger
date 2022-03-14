import React, { FormEventHandler, useEffect, useState } from 'react';

import classes from './index.module.scss';
import Block from "../../components/UI/Block";
import Cubes from "../../components/UI/Cubes";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { clearError, loginUser, RegisterCredentials, registerUser, UserCredentials } from "../../store/slices/user";
import Icon from "../../components/UI/Icon";
import Error from "../../components/UI/Error";
import { useError } from "../../hooks/useError";

interface LoginI {
    isLogin: boolean;
}

const initialUserState = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
};


const Login: React.FC<LoginI> = ({ isLogin }) => {
    const [userState, setUserState] = useState<RegisterCredentials>(initialUserState);
    const { error } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit: FormEventHandler = async (event) => {
        event.preventDefault();
        if (!isLogin) {
            await dispatch(registerUser(userState));
        } else {
            const { username, password } = userState;
            dispatch(loginUser({
                username,
                password,
            }));
        }
    };

    useError(error, clearError, () => {
        setUserState({
            ...userState,
            password: "",
        });
    });

    const onUserChange = (field: keyof RegisterCredentials) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserState({
            ...userState,
            [field]: event.target.value
        });
    };

    const nameAndSurnameFields = (
        <>
            <label className={classes.login__field}>
                <input
                    className={classes.login__input}
                    type="text"
                    onChange={onUserChange("firstName")}
                    value={userState.firstName}
                    placeholder="Name" />
            </label>
            <label className={classes.login__field}>
                <input
                    className={classes.login__input}
                    type="text"
                    onChange={onUserChange("lastName")}
                    value={userState.lastName}
                    placeholder="Surname" />
            </label>
        </>
    );

    return (
        <div className={classes.login}>
            <Block>
                <Cubes />
                <h1 className={classes.login__title}>DREAMESSENGER</h1>
                <form className={classes.login__form} onSubmit={handleSubmit}>
                    <Icon name="lock" size="big" />
                    {!isLogin && nameAndSurnameFields}
                    <label className={classes.login__field}>
                        <input
                            className={classes.login__input}
                            type="text"
                            onChange={onUserChange("username")}
                            value={userState.username}
                            placeholder="Username" />
                    </label>
                    <label className={classes.login__field}>
                        <input
                            className={classes.login__input}
                            type="password"
                            onChange={onUserChange("password")}
                            value={userState.password}
                            placeholder="Password" />
                    </label>
                    <button className={classes.login__button} type="submit">
                        {isLogin ? "Login" : "Sign In"}
                    </button>
                    <Link
                        to={isLogin ? "/sign-in" : "/login"}
                        className={classes.login__link}>
                        {isLogin ? "Create an account" : "I have an account"}
                    </Link>
                </form>
                {error && <Error message={error} />}
            </Block>
        </div>
    );
};

export default Login;
