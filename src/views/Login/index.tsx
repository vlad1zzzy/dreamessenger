import React, {FormEventHandler, useState} from 'react';

import classes from './index.module.scss';
import Block from "../../components/UI/Block";

interface LoginI {
    setUser: (_: string) => void;
}

async function loginUser(credentials: any) {
    // return fetch('https://dreamessenger.herokuapp.com/api/v1/login', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(credentials)
    // })
    //     .then(data => data.json())
    console.log(credentials)
    return "token--id";
}

const Login: React.FC<LoginI> = ({setUser}) => {
    const [username, setUserName] = useState<string>();
    const [password, setPassword] = useState<string>();

    const handleSubmit: FormEventHandler = async (event) => {
        event.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        setUser(token);
    }

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    }

    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    return (
        <div className={classes.login}>
            <Block>
                <form className={classes.login__form} onSubmit={handleSubmit}>
                    <label>
                        <p>Username</p>
                        <input type="text" onChange={onNameChange} />
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" onChange={onPasswordChange} />
                    </label>
                    <button type="submit">Login</button>
                </form>
            </Block>
        </div>
    );
};

export default Login;
