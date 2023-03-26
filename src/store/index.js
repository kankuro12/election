import { configureStore } from "@reduxjs/toolkit";
import election from './reducer';
const store = configureStore({
    reducer: {
        election
    }
});
export default store;