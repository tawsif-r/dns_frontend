import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './Counter';
import navReducer from './Nav';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        nav: navReducer,
    }
})