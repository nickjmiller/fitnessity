import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "../rootReducer";

const STORAGE = "__USER__SETTINGS__";

const preloadedState = localStorage.getItem(STORAGE)
    ? JSON.parse(localStorage.getItem(STORAGE)) : {};

const store = configureStore({
    reducer: rootReducer,
    preloadedState,
});

store.subscribe(() => {
    localStorage.setItem(STORAGE, JSON.stringify({ workout: store.getState().workout }));
});

if (module.hot) {
    module.hot.accept("../rootReducer", () => {
        // eslint-disable-next-line global-require
        const newRootReducer = require("../rootReducer").default;
        store.replaceReducer(newRootReducer);
    });
}

export type AppDispatch = typeof store.dispatch

export default store;
