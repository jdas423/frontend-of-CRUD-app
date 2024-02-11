
import "./css/app.css"

import { Link } from "react-router-dom"
import Searchbar from "./components/searchbar"
import Pagination from "./components/pagination"
import Display from "./components/display"
import {useSelector, useDispatch} from "react-redux"
import { useEffect } from "react"
import axios from "axios"
import {  setUsers, setLimit } from "./js/reducer"


 
export default function App() {
   const {users, currentPageInd} = useSelector(state => state.user)
   const dispatch = useDispatch()
  

    useEffect(()=>{
     
        axios.get('https://suave-shame-production.up.railway.app/api/limit').then((res) => {
          dispatch(setLimit(JSON.parse(res.data).limit))
          axios.get(`https://suave-shame-production.up.railway.app/api/users?pages=${currentPageInd}`).then(res => {
              dispatch(setUsers(res.data))   
          })
      })
      .catch(() => {
          dispatch(setUsers([]))
      })
      
    },[])
    return(
     <div className="w-[600px] h-[100%] flex flex-col justify-center items-center " id="container">
        <div className=' w-[100%]   focus:border-0 mt-[50px] relative' >
          <Searchbar />
          <Link to={"/createUser"} className="block" id="btn">
          <button className="px-8 py-1 border-2 border-indigo-600 bg-indigo-600 rounded-full text-gray-50 font-semibold">Add User</button>
          </Link>
          <div>
               <Display />
          </div>
           {
             (users.length>0 ) && (
              <div className="flex justify-center items-center py-[10px] mb-[10px]">
              <Pagination />
              </div>)
            }
          </div>    
      </div>
    )
    }