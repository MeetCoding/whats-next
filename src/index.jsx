import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import { DataProvider } from './DataContex';

ReactDOM.render(
    <DataProvider>
        <App />
    </DataProvider>,
    document.querySelector("#root")
);
