 
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loading,update, promptRenderer, updateTrigger, disableToggle, setName, setAvailable,setDomain, setEmail, setGender, confirmToggle } from "./js/reducerid";
import { useEffect } from "react";
import axios from "axios";
import DeleteIcon from "./icons/delete";
import UpdateIcon from "./icons/update";
import Prompt from "./components/prompt";
import DeleteMsg from "./components/deletemsg";
import BackIcon from "./icons/back";
import { Link } from "react-router-dom"; 

export default function GetUsers() {
    const { loaded, user, prompt, confirm, updateVar, disable, name, email, available, domain, gender} = useSelector(
      (state) => state.id
    );
    const dispatch = useDispatch();
    const { id } = useParams();
  
    const deleteFunc = function () {
      dispatch(promptRenderer());
      if(updateVar){
          dispatch(updateTrigger());
      }
    };
  
    const updateFunc = function () {
      dispatch(updateTrigger());
      if(updateFunc){
          dispatch(setName(""));
          dispatch(setEmail(""));
          dispatch(setDomain(""));
          dispatch(setGender(""));
          dispatch(setAvailable(user[0].available));
          dispatch(disableToggle(true));
      }
    };
  
    const handleSubmit = function (e) {
      e.preventDefault();
      dispatch(loading("pending"));
      let data = new URLSearchParams();
      if(name!=="") {
        let str1="", str2="",s=0;
        for(let ch of name){
          if(ch===" "){
            s=1;
            continue;
          }
          if(s===0){
            str1+=ch
          }
          else str2+=ch;
        }
        data.append('first_name', str1);
        data.append('last_name', str2);
      } 
      if(email!=="") data.append('email', email);
      if(domain!=="") data.append('domain', domain);
      
      if(gender!=="") data.append('gender', gender);
      
      if(available!== user[0].available){
          data.append('available', available);
      }
     
    
        axios.put(`https://suave-shame-production.up.railway.app/api/users/${id}`, data, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then((res) => {
            console.log("updated")
            console.log(res.data);
            axios.get(`https://suave-shame-production.up.railway.app/api/users/${id}`).then((res) => {
              dispatch(loading("success"));
              dispatch(update(res.data));
              dispatch(updateTrigger());
              dispatch(disableToggle(true));
              dispatch(setAvailable(user[0].available));
              dispatch(setName(""));
              dispatch(setEmail(""));
              dispatch(setDomain(""));
              dispatch(setGender(""));
            });
          })
          .catch((err) => {
            dispatch(loading("error"));
          });
        
      
    }
  
  
    useEffect(() => { 
      if(Object.keys(user).length){
        if(name ==="" && email ===""  && domain ==="" && gender ==="" && available === user[0].available){
          dispatch(disableToggle(true));
       }else{
          dispatch(disableToggle(false));
       }
      }  
    },[name,email,gender,domain,available]);
    
    useEffect(() => {
      if (confirm) {
        axios
          .delete(`https://suave-shame-production.up.railway.app/api/users/${id}`)
          .then((res) => {
          })
          .catch((err) => {
            dispatch(loading("error"));
          });
      }
    }, [confirm]);
  
    useEffect(() => {
      axios
        .get(`https://suave-shame-production.up.railway.app/api/users/${id}`)
        .then((res) => {
          dispatch(loading("success"));
          dispatch(update(res.data));
          dispatch(setAvailable(res.data[0].available));
          dispatch(setName(""));
          dispatch(setEmail(""));
          dispatch(setDomain(""));
          dispatch(setGender(""));
          if(updateVar) dispatch(updateTrigger());
          if(confirm) dispatch(confirmToggle());
          if(prompt) dispatch(promptRenderer());
        })
        .catch((err) => {
          dispatch(loading("error"));
        });
    }, []);
  
  
    if (loaded === "success") {
      if (confirm) {
        return <DeleteMsg />;
      }
      if (prompt) {
        return <Prompt />;
      }
  
      return (
        <div className="w-[600px] min-h-[100vh] h-[fit-content] flex flex-col items-center justify-center text-white">
          <form method="POST" action="" onSubmit={(e)=>handleSubmit(e)} className="text-[14px]">
            <input type="hidden" name="_method" value="PUT" />
            <div className="h-[fit-content] min-w-[fit-content] bg-[rgba(0,0,0,0.6)] rounded-[10px] p-[35px]">
              <div className="flex justify-center">
                <img
                  src={user[0].avatar}
                  alt="no-img"
                  className="w-[130px] h-[130px] block rounded-[70px] bg-[rgba(255,255,255,0.5)] p-[10px]"
                />
              </div>
              <div className="flex flex-row pt-[20px]">
                {updateVar ? (
                  <>
                    <label
                      htmlFor="name"
                      className="block w-[75px] text-right pr-[10px] "
                    >
                      Name:
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder={user[0].first_name + " " + user[0].last_name}
                      className="w-[150px] block text-black text-[14px] px-[5px] "
                      value={name}
                       onChange={e=>dispatch(setName(e.target.value))}
                    />
                  </>
                ) : (
                  <>
                    <div className="w-[75px] text-right pr-[10px]"> Name:</div>
                    <div className="w-[150px]  break-words h-[fit-content]">
                      {user[0].first_name}&nbsp;{user[0].last_name}
                    </div>
                  </>
                )}
              </div>
  
              <div className="flex flex-row pt-[10px] ">
                {updateVar ? (
                  <>
                    <label
                      htmlFor="email"
                      className="block w-[75px] text-right pr-[10px] "
                    >
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder={user[0].email}
                      className="w-[150px] block text-black text-[14px] px-[5px]" 
                      value={email}
                       onChange={e=>dispatch(setEmail(e.target.value))}
                    />
                  </>
                ) : (
                  <>
                    <div className="w-[75px] text-right pr-[10px]"> Email:</div>
                    <div className="w-[fit-content]  break-words h-[fit-content]">
                      {user[0].email}
                    </div>
                  </>
                )}
              </div>
  
              <div className="flex flex-row pt-[10px] ">
                {updateVar ? (
                  <>
                    <label
                      htmlFor="gender"
                      className="block w-[75px] text-right pr-[10px] "
                    >
                      Gender:
                    </label>
                    <input
                      type="text"
                      id="gender"
                      placeholder={user[0].gender}
                      className="w-[150px] block text-black text-[14px] px-[5px]"
                       value={gender}
                       onChange={e=>dispatch(setGender(e.target.value))}
                    />
                  </>
                ) : (
                  <>
                    <div className="w-[75px] text-right pr-[10px]"> Gender:</div>
                    <div className="w-[150px]  break-words h-[fit-content]">
                      {user[0].gender}
                    </div>
                  </>
                )}
              </div>
  
              <div className="flex flex-row pt-[10px]">
                {updateVar ? (
                  <>
                    <label
                      htmlFor="domain"
                      className="block w-[75px] text-right pr-[10px] "
                    >
                      Domain:
                    </label>
                    <input
                      type="text"
                      id="domain"
                      placeholder={user[0].domain}
                      className="w-[150px] block text-black text-[14px] px-[5px]" 
                      value={domain}
                       onChange={e=>dispatch(setDomain(e.target.value))}
                    />
                  </>
                ) : (
                  <>
                    <div className="w-[75px] text-right pr-[10px]"> Domain:</div>
                    <div className="w-[150px]  break-words h-[fit-content]">
                      {user[0].domain}
                    </div>
                  </>
                )}
              </div>
  
              <div className="flex flex-row pt-[10px] pb-[10px]">
                {updateVar ? (
                  <>
                    <div className="flex pr-[20px]">
                    <div className="w-[75px] text-right pr-[10px]">
                      {" "}
                      Available:
                    </div>
                    <div className="w-[50px] flex">
                    <label htmlFor="true" className="text-[16px] block pr-[10px]">True</label>
                      <input
                        type="radio"
                        id="true"
                        name="available"
                        value="true"
                        defaultChecked={user[0].available=== true?true:false}
                        className="block text-[16px]"  onChange={  (e) => {
                          dispatch(setAvailable(true))
                        }}
                      />
                    </div>
                    </div>
                    <div className="flex w-[50px]">
                      <label htmlFor="false" className="text-[16px] block pr-[10px]">False</label>
                      <input
                        type="radio"
                        id="false"
                        name="available"
                        value="false"
                        defaultChecked={user[0].available=== false ?true:false}
                        className="block text-[16px]" onChange={  (e) => {
                          dispatch(setAvailable(false))
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-[75px] text-right pr-[10px]">
                      {" "}
                      Available:
                    </div>
                    <div className="w-[150px]  break-words h-[fit-content]">
                      {user[0].available.toString()}
                    </div>
                  </>
                )}
              </div>
              <div className="flex flex-row pt-[10px] pb-[20px] w-[100%] justify-end">
                
                {
                  updateVar && (
                      <div>
                          <button type="submit" className="pr-[10px] hover:cursor-pointer disabled:text-gray-400 px-[10px] py-[5px] border-2 mr-[20px] text-[13px]" disabled={disable}> SUBMIT</button>
                      </div>
                  )
                }
               
               
                <Link to={"/"}>
                  <div className="pr-[10px] hover:cursor-pointer">
                    <BackIcon />
                  </div>
                </Link>
  
                <div
                  className="pr-[10px] hover:cursor-pointer"
                  onClick={updateFunc}
                >
                  <UpdateIcon />
                </div>
                <div
                  className="pr-[10px] hover:cursor-pointer "
                  onClick={deleteFunc}
                >
                  <DeleteIcon />
                </div>
              </div>
            </div>
          </form>
        </div>
      );
    }
  
    if (loaded === "error") {
      return (
        <div className="w-[100%] h-[100%] flex justify-center items-center">
          error
        </div>
      );
    }
  }
  