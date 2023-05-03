import React from "react";
//import ReactDOM from "react-dom";
import App from ".//App";


import { Provider } from "react-redux";
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import {configureStore} from "@reduxjs/toolkit"
import globalReducer from "./reduxToolKit/changeTheme"
import { setupListeners } from "@reduxjs/toolkit/query";
import {api} from "./reduxToolKit/api"
export const store = configureStore({
    reducer:{
        global:globalReducer,
        [api.reducerPath] :api.reducer,
    },
    middleware:(getDefault) => getDefault().concat(api.middleware)
})
setupListeners(store.dispatch);

//const store = createStore(reducers,compose(applyMiddleware(thunk)))

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
    <Provider store={store}>
        <App />
    </Provider>
</BrowserRouter>
);
