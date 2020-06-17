import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "../rootReducer";

const store = configureStore({
    reducer: rootReducer,
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
