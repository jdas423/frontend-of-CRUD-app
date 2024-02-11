import { createSlice } from '@reduxjs/toolkit'

const initialState = {
     users:[],
     active:false,
     str:"",
     currentPageInd:1,
     toggler1:true,
     toggler2:true,
     toggler3:true,
     disableToggles:false,
     limit:1,
     requestStr:"",
    }

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loading: (state,{payload})=>{
            state.loaded=payload;
        },
        
        setActive: (state,{payload})=>{
            state.active=payload
        },
         setStr: (state,{payload})=>{
            state.str=payload
         },

         setUsers: (state,{payload})=>{
            state.users=payload
         },
         setCurrentPageInd: (state,{payload})=>{
            state.currentPageInd=payload
         },

         setToggler1: (state,{payload})=>{
            state.toggler1=payload
         },

         setToggler2: (state,{payload})=>{
            state.toggler2=payload
         },
         
         setToggler3: (state,{payload})=>{
            state.toggler3=payload
         },

        setDisableToggles:(state,{payload})=>{
            state.disableToggles=payload
         },

         setLimit:(state,{payload})=>{
            state.limit=payload
         },
        
         setRequestStr:(state,{payload})=>{
            state.requsetStr=payload
         }

        
    },
})

export const {loading, setActive,setStr, setUsers, setCurrentPageInd,setToggler1, setToggler2,
    setToggler3,setDisableToggles,setLimit,setRequestStr} = userSlice.actions;
export default userSlice.reducer