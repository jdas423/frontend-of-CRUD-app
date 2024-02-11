
import { setRequestStr } from "./reducer";
export default async function reqFunc(value,dispatch) {
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
   dispatch(setRequestStr(reqStr))
    return new Promise((resolve, reject) => {
      resolve({ reqStr, s });
    });
  }