import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user:{},
    loaded:"pending",
    prompt:false,
    confirm:false,
    updateVar:false,
    disable:true,
    name:'',
    email:'',
    gender:'',
    domain:'',
    available:undefined,
    }

const idSlice = createSlice({
    name: 'id',
    initialState,
    reducers: {
        loading: (state,{payload})=>{
            state.loaded=payload;
        },

        update: (state,{payload})=>{
            state.user=payload;
        },

        promptRenderer: (state)=>{
            state.prompt=!state.prompt;
        },
       
        confirmToggle: (state)=>{
            state.confirm=!state.confirm;
        },

        updateTrigger: (state)=>{
            state.updateVar=!state.updateVar;
        },

        disableToggle: (state, {payload})=>{
            state.disable=payload
        },

        setName: (state,{payload})=>{
            state.name=payload;
        },

        setEmail: (state,{payload})=>{
            state.email=payload;
        },

        setGender: (state,{payload})=>{
            state.gender=payload;
        },
        
        setDomain: (state,{payload})=>{
            state.domain=payload;
        },
        
        setAvailable: (state,{payload})=>{
            state.available=payload;
        }
    },
})

export const {loading, update,promptRenderer,confirmToggle, updateTrigger,disableToggle, setName, setEmail, setGender, setDomain, setAvailable} = idSlice.actions;
export default idSlice.reducer