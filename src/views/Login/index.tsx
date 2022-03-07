import React, { FormEventHandler, useState } from 'react';

import classes from './index.module.scss';
import Block from "../../components/UI/Block";
import lock from "../../assets/icons/lock.svg";
import Cubes from "../../components/UI/Cubes";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { loginUser } from "../../store/slices/user";

interface LoginI {
    setUser: (_: string) => void;
    isLogin: boolean;
}


const Login: React.FC<LoginI> = ({setUser, isLogin}) => {
    const [username, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit: FormEventHandler = async (event) => {
        // event.preventDefault();
        // const token = await loginUser({
        //     username,
        //     password
        // });
        // setUser(token);
        dispatch(loginUser({
            username,
            password,
        }))
    }

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    }

    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const nameAndSurnameFields = (
        <>
            <label className={classes.login__field}>
                <input className={classes.login__input} type="text" onChange={onNameChange}
                       placeholder="Name" maxLength={30} />
            </label>
            <label className={classes.login__field}>
                <input className={classes.login__input} type="text" onChange={onPasswordChange}
                       placeholder="Surname" maxLength={30} />
            </label>
        </>
    )

    return (
        <div className={classes.login}>
            <Block>
                <Cubes />
                <h1 className={classes.login__title}>DREAMESSENGER</h1>
                <form className={classes.login__form} onSubmit={handleSubmit}>
                    <img className={classes.login__icon} src={lock} alt="locked" />
                    {!isLogin && nameAndSurnameFields}
                    <label className={classes.login__field}>
                        <input className={classes.login__input} type="text" onChange={onNameChange}
                               placeholder="Username" maxLength={30} />
                    </label>
                    <label className={classes.login__field}>
                        <input className={classes.login__input} type="password" onChange={onPasswordChange}
                               placeholder="Password" maxLength={30} />
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
            </Block>
        </div>
    );
};

export default Login;
