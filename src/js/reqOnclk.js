
import { setUsers,setCurrentPageInd,setLimit } from "./reducer";
import axios from "axios";
const reqOnclk=(reqStr,dispatch,currentPageInd)=> {
    if(!reqStr){
      axios.get('https://suave-shame-production.up.railway.app/api/limit').then((res) => {
              let limit=JSON.parse(res.data).limit
              axios.get(`https://suave-shame-production.up.railway.app/api/users?pages=${currentPageInd}`).then(res => {
                  dispatch(setUsers(res.data)) 
                  dispatch(setLimit(limit))
                  dispatch(setCurrentPageInd(1));
                  console.log(res.data)  
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
        console.log(res.data);
        dispatch(setUsers(res.data));
        dispatch(setCurrentPageInd(1));
        dispatch(setLimit(Math.ceil(res.data.length/10)))
      })
      .catch(() => {
        dispatch(setUsers([]));
      });
    }
  };

export default reqOnclk;