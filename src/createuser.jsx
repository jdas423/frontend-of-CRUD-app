import { useRef, useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux'
import {  setNameVal, setEmailVal, setDomainVal, setGenderVal, setLoading } from "./js/reducerCreateUser";
import { Link } from "react-router-dom";
import BackIcon from "./icons/back";
import CreateUserPrompt from "./components/createuserprompt";
import axios from "axios";
import "./css/createuser.css"

export default function CreateUser() {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const domainRef = useRef(null);
    const genderRef = useRef(null);
    const availableReftrue = useRef(null);
    const availableReffalse = useRef(null);
    const { nameVal, emailVal, domainVal, genderVal, loaded } = useSelector(state => state.createUser)
    const dispatch = useDispatch()

    useEffect(() => {
      if(nameVal) dispatch(setNameVal(false))
      if(emailVal) dispatch(setEmailVal(false))
      if(domainVal) dispatch(setDomainVal(false))
      if(genderVal) dispatch(setGenderVal(false))
    },[])
    const newUserFunc = (e) => {
        let s=0; 
        e.preventDefault()
        if(!nameRef.current.value  || nameRef.current.value.trim().split(" ").length<2) {
            s=1
            dispatch(setNameVal(true))
        }
        if(!emailRef.current.value) {
          s=1
          dispatch(setEmailVal(true))
        }
        if(!domainRef.current.value){
          s=1
          dispatch(setDomainVal(true))
        } 
        if(!genderRef.current.value){
          s=1
          dispatch(setGenderVal(true))
        } 
        if(s===0){
         dispatch(setLoading("pending"))
         const data = new URLSearchParams()
        let str1="", str2="";
        for(let ch of nameRef.current.value){
            if(ch===" " && str1) s=1;
            if(ch!==" " && s==1) str2+=ch;
            else if(ch!==" ") str1+=ch; 
        }
         data.append('first_name', str1.trim());
         data.append('last_name', str2.trim());
         data.append('email', emailRef.current.value.trim());
         data.append('domain', domainRef.current.value.trim());
         data.append('gender', genderRef.current.value.trim());
         data.append('avatar',  "https://robohash.org/delectuslaborumsunt.png?size=50x50&set=set1");
         if(availableReftrue.current.checked) data.append('available', true);
         else data.append('available', false);
         
         setTimeout(() => {
  
          axios.post(`https://suave-shame-production.up.railway.app/api/users`, data, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
            .then((res) => {
                dispatch(setLoading("success"));
            })
            .catch((err) => {
              dispatch(setLoading("error"));
            });
          
        }, 1000);
        
      }
        
    }

    if(loaded==="success"){
      return(
      <div className="w-[600px] mx-auto min-h-[100vh] h-[fit-content] flex flex-col justify-center items-center ">
      <div className="w-[80%] h-[fit-content] flex items-center justify-center  ">
         <CreateUserPrompt msg="Added" />
      </div>
    </div>
    )
    }

    if(loaded === "initial"){

    return( 
        <div id="container" className="width-[600px] mx-auto h-[fit-content] flex flex-col justify-center items-center">
       <div className="flex min-h-screen items-center justify-center">
      <div className="relative flex flex-col rounded-xl bg-transparent bg-clip-border text-white shadow-none py-[50px]">
    <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
      Add User
    </h4>
    <p className="mt-1 block font-sans text-base font-normal leading-relaxed text-white antialiased">
      Enter User's details.
    </p>
    <form id="userform" className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" method="POST" onSubmit={(e) => newUserFunc(e)}>
      <div className="mb-4 flex flex-col gap-6">
        <div className="relative h-11 w-full min-w-[200px]">
          <input
            className="peer h-full w-full rounded-md border border-blue-500 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" " ref={nameRef} onChange={(e) => {
               if(nameVal) {
                  dispatch(setNameVal(false))
                }
            }}
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Name
          </label>
         
        </div>
        {
          nameVal && (
          <p className="text-xs text-red-400 my-[-15px]">Field cann't be empty.</p> )
        } 
        <div className="relative h-11 w-full min-w-[200px]">
          <input
            className="peer h-full focus:bg-transparent active:bg-transparent w-full rounded-md border border-blue-500 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "  ref={emailRef} type="email" onChange={(e) => {
              if(emailVal) {
                 dispatch(setEmailVal(false))
               }
           } }
           style={{
            ':active': {
              backgroundColor: 'transparent',
            },
            ':focus': {
              backgroundColor: 'transparent',
            },
            ':hover': {
              backgroundColor: 'transparent',
            },
          }}
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Email
          </label>
        </div>
        {
          emailVal && (
          <p className="text-xs text-red-400 my-[-15px]">Field cann't be empty.</p> )

        } 
        <div className="relative h-11 w-full min-w-[200px]">
          <input
            type="text"
            className="peer h-full w-full rounded-md border border-blue-500 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" " ref={genderRef} onChange={(e) => {
              if(genderVal) {
                 dispatch(setGenderVal(false))
               }
           }}
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Gender
          </label>
        </div>
        {
          genderVal && (
          <p className="text-xs text-red-400 my-[-15px]">Field cann't be empty.</p> )

        } 
        <div className="relative h-11 w-full min-w-[200px]">
          <input
            className="peer h-full w-full rounded-md border border-blue-500 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" " ref={domainRef} onChange={(e) => {
              if(domainVal) {
                 dispatch(setDomainVal(false))
               }
           }}
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Domain
          </label>
        </div>
        {
          domainVal && (
          <p className="text-xs text-red-400 my-[-15px] mb-[-5px]">Field cann't be empty.</p> )

        } 
      </div>
    
      <div className="main flex border rounded-md border-blue-500 overflow-hidden select-none w-full min-w-[200px] h-11">
  <div className="title py-3 my-auto px-5 bg-blue-500 text-white text-sm font-semibold mr-3">Available</div>
  <label className="flex radio p-2 cursor-pointer">
    <input className="my-auto transform scale-125" type="radio" name="sfg" defaultChecked ref={availableReftrue} />
    <div className="title px-2">true</div>
  </label>

  <label className="flex radio p-2 cursor-pointer">
    <input className="my-auto transform scale-125" type="radio" name="sfg" ref={availableReffalse}/>
    <div className="title px-2">false</div>
  </label>
  </div>

    
      <button
        className="mt-6 block w-full select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="submit"
        data-ripple-light="true" id="btn"
      >
        Submit
      </button>
    </form>
    <div className="w-[100%] flex justify-end">
    <Link to={"/"}>
         <div className="pr-[30px] hover:cursor-pointer">
                <BackIcon />
           </div>
    </Link>
    </div>
     
  </div>
  
</div>
</div>
    )}

    if(loaded === "error") {
        return(
            <div className="w-[100%] h-[100vh] flex items-center justify-center ">
              Error
              </div>
              )}
}