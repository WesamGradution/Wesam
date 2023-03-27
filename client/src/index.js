import React from "react";
//import ReactDOM from "react-dom";
import App from ".//App";


import { Provider } from "react-redux";
import {createStore,applyMiddleware , compose} from "redux"
import thunk from "redux-thunk"
import reducers from "./reducers"
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";



const store = createStore(reducers,compose(applyMiddleware(thunk)))

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
    <Provider store={store}>
        <App />
    </Provider>
</BrowserRouter>
);
