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
import userReducer from './reduxToolKit/userSlice';

import { persistReducer, persistStore } from "redux-persist"; // import redux-persist functions
import storage from "redux-persist/lib/storage"; // import default storage engine
import { PersistGate } from 'redux-persist/integration/react'; // import PersistGate

const persistConfig = {
    key: "user", // key for the persisted user state
    storage, // use default storage engine
  };
  
const persistedUserReducer = persistReducer(persistConfig, userReducer); // wrap userReducer with persistReducer
  
  export const store = configureStore({
    reducer: {
      global: globalReducer,
      [api.reducerPath]: api.reducer,
      user: persistedUserReducer, // use persistedUserReducer instead of userReducer
    },
    middleware: (getDefault) => getDefault().concat(api.middleware),
    
  });
export const persistor = persistStore(store);
setupListeners(store.dispatch);

//const store = createStore(reducers,compose(applyMiddleware(thunk)))

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}> 
        <App />
      </PersistGate>
    </Provider>
</BrowserRouter>
);
