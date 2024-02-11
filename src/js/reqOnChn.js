
import { setActive, setUsers, setCurrentPageInd,setToggler1,
  setToggler2,setToggler3,setDisableToggles,setLimit } from "./reducer";
import axios from "axios";



const reqOnChn = (reqStr, s, val,dispatch,currentPageInd) => {
    if(!reqStr) {
      axios.get('https://suave-shame-production.up.railway.app/api/limit').then((res) => {
              let limit=JSON.parse(res.data).limit
              axios.get(`https://suave-shame-production.up.railway.app/api/users?pages=${currentPageInd}`).then(res => {
                  dispatch(setUsers(res.data)) 
                  dispatch(setLimit(limit));
                  dispatch(setCurrentPageInd(1));               
              })
          })
          .catch(() => {
              dispatch(setUsers([]))
          })
      dispatch(setActive(false));
    }
    else{

    axios
      .get(`https://suave-shame-production.up.railway.app/api/users/search?${reqStr}`)
      .then((res) => {
        if (s === 1) {
          res.data = res.data.filter(
            (user) =>
              user.first_name ===
              val[0].toUpperCase() + val.slice(1, val.length - 1)
          );
        }
        if (res.data.length === 0) {
          dispatch(setUsers([]));
          dispatch(setActive(false));
        } else {
          dispatch(setUsers(res.data));
          dispatch(setLimit(Math.ceil(res.data.length/10)));
          if(document.querySelector("#search").value && val!=-1) dispatch(setActive(true));
          else if(val==-1){
            dispatch(setToggler1(true));
            dispatch(setToggler2(true))
            dispatch(setToggler3(true))
            dispatch(setDisableToggles(true))
          } 
          dispatch(setCurrentPageInd(1));
        }
      })
      .catch(() => {
        dispatch(setUsers([]));
        dispatch(setActive(false));
      });
    }
    
  };

export default reqOnChn;
