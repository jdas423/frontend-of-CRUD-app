
import "./css/app.css"

import { Link } from "react-router-dom"
import Searchbar from "./components/searchbar"
import Pagination from "./components/pagination"
import Display from "./components/display"
import {useSelector, useDispatch} from "react-redux"
import { useEffect } from "react"
import axios from "axios"
import {  setUsers } from "./js/reducer"
import { setToggler1, setToggler2, setToggler3, setAggregate1, setAggregate2, setAggregate3 } from "./js/reducer"
let limit=1
 
export default function App() {
   const {toggler1,toggler2,toggler3,users, currentPageInd, initiate,aggregate1,aggregate2,aggregate3} = useSelector(state => state.user)
   const dispatch = useDispatch()
  

    useEffect(()=>{
       if(!toggler1) dispatch(setToggler1(true))
       if(!toggler2) dispatch(setToggler2(true))
       if(!toggler3) dispatch(setToggler3(true))
       if(!aggregate1) dispatch(setAggregate1(true))
       if(!aggregate2) dispatch(setAggregate2(true))
       if(!aggregate3) dispatch(setAggregate3(true))
    },[])

    useEffect(()=>{
      console.log("app rendered")
      if((toggler1 && toggler2 && toggler3 && initiate) || (aggregate1 && aggregate2 && aggregate3 && initiate) 
      || (toggler1 && aggregate2 && aggregate3 && initiate)  || (toggler1 && toggler2 && aggregate3 && initiate)
      || (aggregate1 && toggler2 && aggregate3 && initiate)  || (aggregate1 && aggregate2 && toggler3 && initiate)
      || (aggregate1 && toggler2 && toggler3 && initiate)  || (toggler1 && aggregate2 && toggler3 && initiate)

      ){
        axios.get('https://suave-shame-production.up.railway.app/api/limit').then((res) => {
          limit=JSON.parse(res.data).limit;
          console.log(limit)
          axios.get(`https://suave-shame-production.up.railway.app/api/users?pages=${currentPageInd}`).then(res => {
              console.log()
              dispatch(setUsers(res.data))   
          })
      })
      .catch((err) => {
          console.log(err)
          dispatch(setUsers([]))
      })
      
      }
    },[toggler1,toggler2,toggler3,currentPageInd,initiate])
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
              <Pagination lim={limit}/>
              </div>)
            }
          </div>    
      </div>
    )
    }