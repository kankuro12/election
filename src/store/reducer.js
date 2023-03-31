/* eslint-disable eqeqeq */
import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import { json } from 'react-router-dom';
import API from "../api";

export const initialState = {
    logged: false,
    user: null,
    loader: false,
    authChecked: false,
};



export const setupLogin = createAsyncThunk('election/setupLogin', async (options) => {
    // console.log(token, "token");
    const token = API.getToken();
    if (token) {
        const user=JSON.parse( localStorage.getItem('user')??"{}");
        
        return { logged: true, user: user };

    }else{
        return { logged: false, user: null };

    }
    //     try {
    //         const userInfo = await API.get('user');
    //         console.log(userInfo);

    //         return { logged: true, user: userInfo }

    //     } catch (error) {
    //         return { logged: false, user: null };

    //     }

    // } else {
    // }



});



export const saveAuth = createAsyncThunk('election/saveAuth', async (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    return user;
});


export const logout = createAsyncThunk('election/logout', async (user) => {
    localStorage.removeItem('user');
    return null;
});



export const ElectionReducer = createSlice({
    extraReducers: {


        [saveAuth.fulfilled]: (state, action) => {
            const data = action.payload;
            return { ...state, loader: false, user: data, logged: true }
        },
        [logout.fulfilled]: (state, action) => {
            const data = action.payload;
            return { ...state, loader: false, user: data, logged: false }
        },
        [setupLogin.fulfilled]: (state, action) => {
            const data = action.payload;
            return { ...state, loader: false, user: data.user, logged: data.logged, authChecked: true }
        },

    },
    initialState,
    name: 'election'
})
export default ElectionReducer.reducer;
