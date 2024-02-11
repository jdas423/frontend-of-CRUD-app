 import Toggle from "./toggle"
 import "../css/radiobtn.css"
 import {useSelector, useDispatch} from 'react-redux'
 import {useRef} from 'react'
 import {setUsers} from "../js/reducer"
 import reqFunc from "../js/requestString"
 import reqOnclk from "../js/reqOnclk"
 export default function RadioBtn({inputBar}) {
    const {toggler1,toggler2,toggler3,currentPageInd}=useSelector((state)=>state.user)
    const dispatch=useDispatch()
    const [genderCon,availableCon,domainCon]=[useRef(null),useRef(null),useRef(null)]
    const gender=["Male","Female"],available=[true,false], domains=["IT","Management","Engineering"];
    const checkedStyle="peer-checked:border-transparent peer-checked:ring-[4px] peer-checked:ring-red-500"
    const uncheckedStyle= " flex justify-center cursor-pointer rounded-full border border-gray-300 bg-white py-2 px-4 hover:bg-gray-50 focus:outline-none  transition-all duration-500 ease-in-out mt-[5px]w-[79px] text-[12px] h-[20px] text-center leading-[1px]"
    
 return(
    
<div  id="radiobtn" className='flex flex-col items-center justify-center h-[fit-content] py-[15px]'>
<ul className="mx-auto max-w-full w-full flex items-center justify-start px-4 py-[3px] pt-[10px]" ref={genderCon}>
    <li className="block mr-[20px]" key="gen0"
   
    >
        <Toggle name="toggler1" dis="Filter by Gender"/>
  </li>
    {
        gender.map((item,index)=>{
            return(
                <li className="mr-[10px]" key={`gen${index}`}>
                <input className="peer sr-only" type="radio" value={item} name="answer1" 
                disabled={toggler1} id={`gen${index}`} defaultChecked={false}
                onClick={()=>{
                    reqFunc(inputBar.current.value,dispatch).then(({reqStr})=>{
                        reqOnclk(reqStr,dispatch,currentPageInd)
                    }).catch((err)=>{
                        dispatch(setUsers([]))
                    })
                }} />
                 <label className=
                 {
                     !toggler1 ? (uncheckedStyle+" "+checkedStyle) : uncheckedStyle
                 }
                 
                 htmlFor={`gen${index}`}>{item}</label>
                </li>
            )
        })
    }
</ul>

<ul className="mx-auto max-w-full w-full flex justify-start items-center px-4 py-[3px]" ref={availableCon}>
    <li className="block mr-[20px]" key="av0"
    ><Toggle name="toggler2" dis="Filter by availability"/></li>
    {
        available.map((item,index)=>{
            return(
                <li className="mr-[10px]"  key={`available${index}`}>
                <input className="peer sr-only" type="radio" value={item} name="answer2"
                 disabled={toggler2} id={`av${index}`} defaultChecked={false}
                 onClick={()=>{
                    reqFunc(inputBar.current.value,dispatch).then(({reqStr})=>{
                        reqOnclk(reqStr,dispatch)
                    }).catch((err)=>{
                        console.log(err)
                        dispatch(setUsers([]))
                    })
                }} />
                 <label className=
                
                 {
                     !toggler2 ? (uncheckedStyle+" "+checkedStyle) : uncheckedStyle
                 }
                 
                 htmlFor={`av${index}`}>{item.toString()}</label>
                </li>
            )
        })
    }
</ul>

<ul className="mx-auto  max-w-full w-full flex justify-start items-center px-4 py-[3px]" ref={domainCon}>
    <li className="block mr-[20px]" key="dom0"
    ><Toggle name="toggler3" dis="Filter by domain"/></li>
    {
        domains.map((item,index)=>{
            return(
                <li className="mr-[10px]"  key={`dom${index}`}>
                <input className="peer sr-only" type="radio" value={item} name="answer3"
                 disabled={toggler3} id={`dom${index}`} defaultChecked={false}
                 onClick={()=>{
                    reqFunc(inputBar.current.value,dispatch).then(({reqStr})=>{
                        reqOnclk(reqStr,dispatch)
                    }).catch((err)=>{
                        dispatch(setUsers([]))
                    })
                }} />
                 <label className=
                 {
                     !toggler3 ? (uncheckedStyle+" "+checkedStyle) : uncheckedStyle
                 } htmlFor={`dom${index}`}>{item}</label>
                </li>
            )
        })
    }
</ul>
</div>


    )
  }