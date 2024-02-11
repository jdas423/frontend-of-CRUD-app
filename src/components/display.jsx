
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";

export default function Display() { 
    const {users,currentPageInd,limit}= useSelector(state => state.user);
    const genLi=()=>{
        const li=[]
        if(Math.ceil(users.length/10)<limit){
          for(let i=0;i<users.length;i++){
            li.push(
                <div className="flex items-center justify-center flex-col bg-gray-700 p-4 rounded-lg w-48 space-y-4" key={i}>
                <img className="rounded-full border-gray-100 shadow-sm w-24 h-24" src={users[i].avatar} alt="user image" />
                <h1 className="text-gray-50 font-semibold">{users[i].first_name}&nbsp;{users[i].last_name}</h1>
                <Link to={`/getUsers/${users[i].id}`}>
                    <button className="px-8 py-1 border-2 border-indigo-600 bg-indigo-600 rounded-full text-gray-50 font-semibold">Details</button>
                 </Link>
         </div>
            )}
        }
        else{
        for(let i=(currentPageInd-1)*10;i<currentPageInd*10 && i<users.length;i++){
            li.push(
                <div className="flex items-center justify-center flex-col bg-gray-700 p-4 rounded-lg w-48 space-y-4" key={i}>
                <img className="rounded-full border-gray-100 shadow-sm w-24 h-24" src={users[i].avatar} alt="user image" />
                <h1 className="text-gray-50 font-semibold">{users[i].first_name}&nbsp;{users[i].last_name}</h1>
                <Link to={`/getUsers/${users[i].id}`}>
                    <button className="px-8 py-1 border-2 border-indigo-600 bg-indigo-600 rounded-full text-gray-50 font-semibold">Details</button>
                 </Link>
              
              
         </div>
            )}
            }
        return li;
    }
    return(
<div className="flex  items-start justify-center h-[fit-content] bg-gray-900 my-[20px]">
   <div className="bg-gray-800 rounded-lg shadow-xl p-8">
     <div className="mb-4">
       <h1 className="font-semibold text-gray-50">Users</h1>
     </div>
     {users.length>0 ? ( users.length > 1 ?
     <div className="grid grid-cols-2 gap-4" id="grid">
        {
          genLi()
        }
     </div> :
     <div className="grid grid-cols-1 gap-4">
         <div className="flex items-center justify-center flex-col bg-gray-700 p-4 rounded-lg w-48 space-y-4">
                    <img className="rounded-full border-gray-100 shadow-sm w-24 h-24" src={users[0].avatar} alt="user image" />
                    <h1 className="text-gray-50 font-semibold">{users[0].first_name}&nbsp;{users[0].last_name}</h1>
                   <button className="px-8 py-1 border-2 border-indigo-600 bg-indigo-600 rounded-full text-gray-50 font-semibold">Details</button>
             </div>
     </div>
     )
     :
     (
        <div className="grid grid-cols-1 gap-4">
        <div id="nouser" className="flex items-center justify-center flex-col bg-gray-700 p-4 rounded-lg w-48 space-y-4">
                  No Users
            </div>
     </div>
     )
    }
     </div>
 </div>
    )
}