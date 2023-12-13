import "../css/toggle.css";
import { useSelector, useDispatch} from "react-redux";
import {setToggler1,setToggler2,setToggler3} from "../js/reducer"


export default function Toggle({name,dis}) {
    const {toggler1,toggler2,toggler3}=useSelector((state)=>state.user)
    const dispatch=useDispatch()
    return(
    <>
    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
    <input type="checkbox" name={name} id={name}
     className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 
     appearance-none cursor-pointer"
     onClick={()=>{
        if(name==="toggler1"){
            dispatch(setToggler1(!toggler1))
        }
        if(name==="toggler2"){
            dispatch(setToggler2(!toggler2))
        }
        if(name==="toggler3"){
            dispatch(setToggler3(!toggler3))
        }     
     }}
     />
    <label htmlFor={name} className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
   </div>
   <label htmlFor={name} className="text-xs text-white">{dis}</label>  
    </>    


    )
}