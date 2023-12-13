 import { useDispatch, useSelector } from "react-redux"
 import { promptRenderer, confirmToggle } from "../js/reducerid"

 
 export default function Prompt(){
    const dispatch = useDispatch()
    const cancelFunc = ()=>{
        dispatch(promptRenderer())
    }

    const deleteFunc = ()=>{
        dispatch(confirmToggle())
        dispatch(promptRenderer()) 
    }
    
    return(
        <div className="w-[100%] h-[100vh] flex items-center justify-center ">
            <div className="w-[400px] h-[fit-content] flex flex-col bg-[rgba(0,0,0,0.8)] text-white">
               <div className="w-[100%] h-[110px]  box-border p-[33px] text-[20px]">Do you really want to delete?</div>
               <div className="w-[100%] h-[30px] flex justify-end box-border p-[20px] pb-[40px] items-center">
                  <button className="mr-[10px] py-[0] px-[13px] bg-red-500" onClick={cancelFunc}>
                    Cancel
                  </button>
                  <button className="mr-[10px] py-[0] px-[13px] bg-red-500" onClick={deleteFunc}>
                    Delete
                  </button>
               </div>
            </div>
        </div>
    )
  }