import { PayloadAction } from "@reduxjs/toolkit";
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { suggestUser, Users } from "../../store/slices/user";
import Pressable from "../Pressable";
import Block from "../UI/Block";
import Input from '../UI/Input';

import classes from "./index.module.scss";

interface SearchInputI {
    setSuggests: Dispatch<SetStateAction<any>>,
    setShowSuggests?: Dispatch<SetStateAction<boolean>>,
}

const SearchInput: React.FC<SearchInputI> = ({ setSuggests, setShowSuggests }) => {
    const [search, setSearch] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();

    const handleSearch = async () => {
        if (search) {
            const users = await dispatch(suggestUser(search)) as PayloadAction<Users>;
            setSuggests(users.payload);
            setSearch("");
            setShowSuggests?.(true);
        }
    };

    return (
        <Block>
            <div className={classes.search}>
                <Pressable iconName="search" onClick={handleSearch} />
                <Input
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Pressable iconName="options" onClick={() => console.log("options")} />
            </div>
        </Block>
    );
};

export default SearchInput;
