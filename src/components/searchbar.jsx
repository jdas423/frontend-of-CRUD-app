import RadioBtn from "./radiobtns";
import { useSelector, useDispatch } from "react-redux";
import { setActive, setUsers, setStr, setInitiate, setCurrentPageInd } from "../js/reducer";
import { useRef, useEffect } from "react";
import axios from "axios";
let val = 0;
export default function Searchbar() {
  const { active, users, str} = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const dialog = useRef(null);
  const inputBar = useRef(null);

  async function reqFunc(value) {
    let s = 0,
      reqStr = "";

    if (document.querySelector("#toggler1").checked) {
      document.querySelectorAll("input[name='answer1']").forEach((item) => {
        if (item.checked) {
          reqStr = reqStr + "gender=" + item.value;
        }
      });
    }

    if (document.querySelector("#toggler2").checked) {
      document.querySelectorAll("input[name='answer2']").forEach((item) => {
        if (item.checked) {
          if (reqStr) reqStr = reqStr + "&available=" + item.value;
          else reqStr = reqStr + "available=" + item.value;
        }
      });
    }

    if (document.querySelector("#toggler3").checked) {
      document.querySelectorAll("input[name='answer3']").forEach((item) => {
        if (item.checked) {
          if (reqStr) reqStr = reqStr + "&domain=" + item.value;
          else reqStr = reqStr + "domain=" + item.value;
        }
      });
    }

    if (value) {
      const str = value.split(" ");
      if (str.length === 1) {
        if (reqStr) reqStr = reqStr + `&firstName=${str[0]}`;
        else reqStr = `firstName=${str[0]}`;
      } else if (str.length === 2 && str[0] && !str[1]) {
        s = 1;
        if (reqStr) reqStr = reqStr + `&firstName=${str[0]}`;
        else reqStr = `firstName=${str[0]}`;
      } else if (str.length === 2 && str[0] && str[1]) {
        if (reqStr) reqStr = reqStr + `&firstName=${str[0]}&lastName=${str[1]}`;
        else reqStr = `firstName=${str[0]}&lastName=${str[1]}`;
      } else
        return new Promise((resolve, reject) => {
          reject("Invalid Input"); 
        });
    }
    return new Promise((resolve, reject) => {
      resolve({ reqStr, s });
    });
  }

  const reqOnclk = (reqStr) => {
    axios
      .get(`https://suave-shame-production.up.railway.app/api/users/search?${reqStr}`)
      .then((res) => {
        dispatch(setUsers(res.data));
        dispatch(setCurrentPageInd(1));
      })
      .catch((err) => {
        dispatch(setUsers([]));
      });
  };

  const reqOnChn = (reqStr, s, val) => {
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
        console.log(res.data);
        if (res.data.length === 0) {
          dispatch(setUsers([]));
          dispatch(setActive(false));
          dispatch(setStr(val));
          dispatch(setInitiate(false));
        } else {
          dispatch(setUsers(res.data));
          dispatch(setActive(true));
          dispatch(setStr(val));
          dispatch(setInitiate(false));
          dispatch(setCurrentPageInd(1));
        }
      })
      .catch((err) => {
        dispatch(setUsers([]));
        dispatch(setActive(false));
        dispatch(setStr(val));
        dispatch(setInitiate(false));
        if(!val || val[val.length-1]==" ") dispatch(setInitiate(true));
      });
  };

  useEffect(() => {
    if (active) {
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
            value={str}
            onBlur={(e) => {
              setTimeout(() => {
                if (active) dispatch(setActive(false));
              }, 500);
            }}
            onChange={(e) => {
              let caretpos = e.target.selectionStart;
              let value = e.target.value;
              val = caretpos;
              reqFunc(value)
                .then(({ reqStr, s }) => {
                  reqOnChn(reqStr, s, value);
                })
                .catch((err) => {
                  dispatch(setUsers([]));
                  dispatch(setActive(false));
                  dispatch(setStr(value));
                });
            }}
          />
        </div>
        {active && (
          <div
            className="dialog absolute min-w-[100px] w-[fit-content] h-[fit-content] max-h-[200px] overflow-y-scroll px-[20px] bg-slate-300 top-[45px] text-[15px] flex flex-col items-center content-center"
            ref={dialog}
          >
            {users.map((user, i) => {
              return (
                <div
                  className="w-[100%] font-sans cursor-pointer"
                  key={i}
                  onClick={() => {
                    dispatch(setStr(user.first_name + " " + user.last_name));
                    dispatch(setActive(false));
                  }}
                >
                  {`${user.first_name} ${user.last_name}`}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div>
        <RadioBtn reqFunc={reqFunc} reqOnclk={reqOnclk} inputBar={inputBar} />
      </div>
    </>
  );
}
