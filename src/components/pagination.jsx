import {useSelector, useDispatch} from "react-redux"
import {setCurrentPageInd} from "../js/reducer"
import { useEffect } from "react"
let pLimit


export default function Pagination({lim}) {
    const {users,currentPageInd,active,toggler1,toggler2,toggler3,initiate,aggregate1,aggregate2,aggregate3} = useSelector(state => state.user);
    const dispatch = useDispatch();
    console.log(users)
    if((toggler1 && toggler2 && toggler3 && initiate) || (aggregate1 && aggregate2 && aggregate3 && initiate) 
    || (toggler1 && aggregate2 && aggregate3 && initiate)  || (toggler1 && toggler2 && aggregate3 && initiate)
    || (aggregate1 && toggler2 && aggregate3 && initiate)  || (aggregate1 && aggregate2 && toggler3 && initiate)
    || (aggregate1 && toggler2 && toggler3 && initiate)  || (toggler1 && aggregate2 && toggler3 && initiate)

    ) pLimit=lim;
    else pLimit=Math.ceil(users.length/10);
  
    useEffect(()=>{
      dispatch(setCurrentPageInd(1))
    },[active])
   

    const leftClick=(e)=>{
        e.preventDefault();
        if(currentPageInd===pLimit){
          dispatch(setCurrentPageInd(1))
        }
       else {
           dispatch(setCurrentPageInd(currentPageInd+1))
       }
        
    }

    const rightClick=(e)=>{
        e.preventDefault();
        if(currentPageInd===1){
          dispatch(setCurrentPageInd(pLimit))
        }
        else{
            dispatch(setCurrentPageInd(currentPageInd-1))
        }
   }
    
    
    return(
<div className="max-w-2xl mx-auto">

	<nav aria-label="Page navigation" >
  <ul className="inline-flex items-center -space-x-px relative">
    <li className="relative z-10" onClick={(e)=>rightClick(e)}>
      <a  className="block p-[1px] ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        <span className="sr-only">Previous</span>
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
      </a>
    </li>
    
    <div className="relative z-[5] flex h-[25px] text-white justify-center w-[100px]">
           <div className="leading-[25px]">{currentPageInd} of {pLimit}</div>
    </div>
      
   
    <li className="relative z-10" onClick={(e)=>leftClick(e)} >
      <a  href="3" className="block p-[1px] leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        <span className="sr-only">Next</span>
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
      </a>
    </li>
     
  </ul>
</nav>
</div>
    )
}


