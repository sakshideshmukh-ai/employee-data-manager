// src/store/store.js
// Configure the Redux store and export it
import { configureStore } from '@reduxjs/toolkit';
import tableReducer from './tableSlice';

const store = configureStore({
    reducer: {
        table: tableReducer,
    },
});

export default store;
