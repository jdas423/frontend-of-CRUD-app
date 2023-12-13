import { createSlice } from '@reduxjs/toolkit'

const initialState = {
     users:[],
     active:false,
     str:"",
     currentPageInd:1,
     toggler1:true,
     toggler2:true,
     toggler3:true,
     initiate:true,
     aggregate1:true,
     aggregate2:true,
     aggregate3:true,
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

         setInitiate: (state,{payload})=>{
            state.initiate=payload
         },
         setAggregate1: (state,{payload})=>{
            state.aggregate1=payload
         },
         setAggregate2: (state,{payload})=>{
            state.aggregate2=payload
         },

         setAggregate3: (state,{payload})=>{
            state.aggregate3=payload
         }
        
    },
})

export const {loading, setActive,setStr, setUsers, setCurrentPageInd,setToggler1, setToggler2,
    setToggler3, setInitiate,setAggregate1,setAggregate2,setAggregate3} = userSlice.actions;
export default userSlice.reducer