import { Link } from "react-router-dom"
import BackIcon from "../icons/back"

export default function DeleteMsg(){
    return(
        <div className="w-[100%] h-[100vh] flex items-center justify-center ">
        <div className="w-[400px] h-[fit-content] flex flex-col bg-[rgba(0,0,0,0.8)] text-white">
           <div className="w-[100%] h-[110px]  box-border p-[60px] text-[20px]  uppercase">
              Deleted
           </div>
           <div className="flex flex-row pt-[10px] pb-[20px] w-[100%] justify-end">
            <Link to={"/"}>
               <div className="pr-[50px] hover:cursor-pointer ">
               <BackIcon />
               </div>
            </Link>         
           </div>
        </div>
    </div>
    )
}
