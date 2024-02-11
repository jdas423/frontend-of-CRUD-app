import "../css/toggle.css";
import { useSelector, useDispatch} from "react-redux";
import {setToggler1,setToggler2,setToggler3,setUsers} from "../js/reducer"
import reqFunc from "../js/requestString";
import reqOnclk from "../js/reqOnclk";


export default function Toggle({name,dis}) {
    const {toggler1,toggler2,toggler3,disableToggles,currentPageInd}=useSelector((state)=>state.user)
    const dispatch=useDispatch()
    const val=(()=>{
        if(name==="toggler1") return !toggler1;
        else if(name==="toggler2") return !toggler2;
        else if(name==="toggler3") return !toggler3;
    })();
    
    return(
    <>
    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
    <input type="checkbox" name={name} id={name}
     className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 
     appearance-none cursor-pointer" checked={val} onChange={(e)=>{}}
     onClick={()=>{
        if(!disableToggles){
            if(name==="toggler1"){
                reqFunc(document.querySelector('#search').value,dispatch).then(({reqStr})=>{
                    reqOnclk(reqStr,dispatch,currentPageInd)
                }).catch((err)=>{
                    dispatch(setUsers([]))
                })
                dispatch(setToggler1(!toggler1))
            }
            if(name==="toggler2"){
                reqFunc(document.querySelector('#search').value,dispatch).then(({reqStr})=>{
                    reqOnclk(reqStr,dispatch,currentPageInd)
                }).catch((err)=>{
                    dispatch(setUsers([]))
                })
                dispatch(setToggler2(!toggler2))
            }
            if(name==="toggler3"){
                reqFunc(document.querySelector('#search').value,dispatch).then(({reqStr})=>{
                    reqOnclk(reqStr,dispatch,currentPageInd)
                }).catch((err)=>{
                    dispatch(setUsers([]))
                })
                dispatch(setToggler3(!toggler3))
            } 
        }       
     }}
     />
    <label htmlFor={name} className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
   </div>
   <label htmlFor={name} className="text-xs text-white">{dis}</label>  
    </>    


    )
}