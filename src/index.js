/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import App from './App';

import './utils/svg-loader';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('root'),
);
