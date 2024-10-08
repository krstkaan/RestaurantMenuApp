import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./UserSlice";
import { thunk } from 'redux-thunk';

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})