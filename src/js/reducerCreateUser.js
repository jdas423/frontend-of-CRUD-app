import { createSlice } from '@reduxjs/toolkit'

const initialState = {
      loaded:"initial",
       nameVal:false,
       emailVal:false,
       domainVal:false,
       genderVal:false
    }

const createUserSlice = createSlice({
    name: 'createuser',
    initialState,
    reducers: {
       setLoading: (state, action) => {
        state.loaded = action.payload
       },
       setNameVal: (state, action) => {
        state.nameVal = action.payload
       },

       setEmailVal: (state, action) => {
        state.emailVal = action.payload
       },

       setDomainVal: (state, action) => {
        state.domainVal = action.payload
       },       

       setGenderVal: (state, action) => {
        state.genderVal = action.payload
       },


    },
})

export const {setNameVal,setEmailVal,setDomainVal,setGenderVal,setLoading} = createUserSlice.actions;
export default createUserSlice.reducer