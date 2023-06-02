import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import Dashboard from './views/dashboard/Dashboard'
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
import { useState, useContext, useEffect } from "react";
import { GlobalContext } from './context/context';
// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
// const Register = React.lazy(() => import('./views/pages/register/Register'))
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

// class App extends Component {
  // render() {
    function App() {
    let { state, dispatch } = useContext(GlobalContext);


    
    return (
     <>
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            {/* <Route exact path="/register" name="Register Page" element={<Register />} /> */}
            {/* <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} /> */}
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </HashRouter>


      {/* {(state.isLogin != (null || '' || undefined) && state.isLogin === true) ?
             
             <Routes>
                 <Route path="/" element={<DefaultLayout />} />

                //  <Route path="/dashboard" element={<Dashboard />} />
                
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

   : null} */}




</>






    )
  }
// }

export default App
