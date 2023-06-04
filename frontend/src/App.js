import React, { Component, Suspense } from 'react'

import './scss/style.scss'
import Dashboard from './views/dashboard/Dashboard'
import { Routes, Route, Link,  Navigate } from "react-router-dom"
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
import Loader from './assets/images/loader (1).gif'
import { useState, useContext, useEffect } from "react";
import { GlobalContext } from './context/context';
// Containers
// const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

 import  DefaultLayout from './layout/DefaultLayout'
 import  Login from './views/pages/login/Login'
// Pages
// const Login = React.lazy(() => import('./views/pages/login/Login'))
// const Register = React.lazy(() => import('./views/pages/register/Register'))
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

// class App extends Component {
  // render() {
    function App() {
    let { state, dispatch } = useContext(GlobalContext);


    
    const getUser = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/users");
        console.log("response", response.data);
        dispatch({
          type: 'USER_LOGIN',
          payload: response.data[0]
         
      
      })
      console.log("State" ,state);
      } catch (error) {
     
        dispatch({
          type: 'USER_LOGOUT',
       
         
      
      })
      }
    };
    useEffect(() => {

         getUser()
         
     }, [])
    
    return (
     <>
      {/* <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
         
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </HashRouter> */}


      {(state.isLogin != (null || '' || undefined) && state.isLogin === true) ?
             
             <Routes>
                 <Route path="*" element={<DefaultLayout />} />

             <Route path="/" element={<Dashboard />} />
                
                 <Route path="*" element={<Navigate to="/" replace={true} />} />
             </Routes>
         
         : null}

     {state.isLogin == (null || '' || undefined || false) ?
    

             <Routes>
                 <Route path="/login" element={<Login />} />
                 <Route path="*" element={<Navigate to="/login" replace={true} />} />
             </Routes>
         
         : null
     }
    {(state.isLogin === null) ?

 <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: '100vh' }}>
 <img width={100} src={Loader} alt="loading" />
  </div>

   : null}




</>






    )
  }
// }

export default App
