import {configureStore} from '@reduxjs/toolkit';
import userReducer from './reducer';
import idReducer from './reducerid';
import createUserReducer from "./reducerCreateUser"

 export const store=configureStore({
    reducer: {
        user: userReducer,
        id: idReducer,
        createUser: createUserReducer
    },
 });