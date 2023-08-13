import React from 'react'
import {Routes, Route, Navigate } from 'react-router-dom'
import CircularProgress from "@mui/material/CircularProgress"
import Nav from './layout/Nav'
import PrivateRoute from './public/PrivateRoute'
import Login from './public/Login'
import Users from './pages/Users'
import {AppProvider} from './contexts/App'

import {Context as AuthContext} from './contexts/Auth'
function App() {
  const Loader = <CircularProgress size={50}/>
  const {auth} = React.useContext(AuthContext)
  console.log({auth})
  return (
    <div>
      
    {auth? 
        <AppProvider>
          <Nav/>
          <Routes>
            <Route path="/" element={ <PrivateRoute component={<Users/>} Loader={Loader}/> }/>
            <Route path="/users" element={ <PrivateRoute component={<Users/>} Loader={Loader}/> }/>
          </Routes>
        </AppProvider>
      :<Routes>
          <Route path="*" element={<Login/>}/>
      </Routes>
    }
    </div>
  );
}

export default App;