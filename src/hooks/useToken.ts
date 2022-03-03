import {useState} from 'react';

export const useToken = (tokenName: string) => {
    const getToken = () => {
        return localStorage.getItem(tokenName);
    };

    const [userToken, setUserToken] = useState(getToken());

    const setToken = (userToken: string) => {
        localStorage.setItem(tokenName, userToken);
        setUserToken(userToken);
    };

    const removeToken = () => {
        localStorage.removeItem(tokenName);
        setUserToken(null);
    }

    return {
        setToken,
        removeToken,
        token: userToken,
    }
}