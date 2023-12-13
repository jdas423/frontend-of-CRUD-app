import {Routes, Route} from 'react-router-dom'
import App from './App'
import CreateUser from './createuser'
import GetUser from './getusers'

export default function RouterPaths(){
   return(
      <Routes>
         <Route path="/" element={<App/>}/>
         <Route path="/createUser" element={<CreateUser/>}/>
         <Route path="/getUsers/:id" element={<GetUser/>}/>
      </Routes>
   )
}