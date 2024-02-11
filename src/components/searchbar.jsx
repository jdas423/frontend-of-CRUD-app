import reqFunc from "../js/requestString";
import reqOnChn from "../js/reqOnChn";
import RadioBtn from "./radiobtns";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useEffect, forwardRef } from "react";
import { setActive, setUsers,setDisableToggles } from "../js/reducer";
let val = 0;
export default function Searchbar() {
  const { active, users,disableToggles,currentPageInd} = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const dialog = useRef(null);
  const inputBar = useRef(null);

  
  useEffect(() => {
    if (active && dialog.current) {
      dialog.current.style.left = `min(400px,calc(67px + ${7 * val}px)`;
    }
  }, [val]);

  return (
    <>
      <div>
        <div id="search-container" className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border-2 border-gray-300">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
            type="text"
            id="search"
            placeholder="Search something.."
            ref={inputBar}
            onBlur={(e) => {
              setTimeout(() => {
                if (active) dispatch(setActive(false));
              }, 500);
            }}
            onChange={(e) => {
              let caretpos = e.target.selectionStart;
              let value = e.target.value;
              val = caretpos;
              reqFunc(value,dispatch)
                .then(({ reqStr, s }) => {
                  reqOnChn(reqStr, s, value,dispatch,currentPageInd);
                })
                .catch(() => {
                  dispatch(setUsers([]));
                });
                if(disableToggles) dispatch(setDisableToggles(false))
            }}
          />
        </div>
        {active && ( <DialogBox users={users} dispatch={dispatch} ref={dialog} currentPageInd={currentPageInd}/>  )}
      </div>
      <div>
        <RadioBtn inputBar={inputBar} />
      </div>
    </>
  );
}


const  DialogBox= forwardRef(({users,dispatch,currentPageInd},dialog)=>{

  return(
    <div
    className="dialog absolute min-w-[100px] z-10 w-[fit-content] h-[fit-content] max-h-[200px] overflow-y-scroll px-[20px] bg-slate-300 top-[45px] text-[15px] flex flex-col items-center content-center"
    ref={dialog}
  >
    {users.map((user, i) => {
      return (
        <div
          className="w-[100%] font-sans cursor-pointer"
          key={i}
          onClick={() => {
            const inputBar=document.querySelector("#search")
            inputBar.value = `${user.first_name} ${user.last_name}`;
            reqFunc(inputBar.value,dispatch)
                .then(({ reqStr, s }) => {
                  reqOnChn(reqStr, s, -1,dispatch,currentPageInd);
                })
          }}
        >
          {`${user.first_name} ${user.last_name}`}
        </div>
      );
    })}
  </div>
  )
 
})