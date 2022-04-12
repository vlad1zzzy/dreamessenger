/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";

import App from './App';

import './index.scss';
import { store } from "./store";
import './utils/svg-loader';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter>
                <App />
            </HashRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
