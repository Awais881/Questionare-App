import React, { Component, Suspense } from 'react'
import PrivateRoute from './provider';
import './scss/style.scss'
import Dashboard from './views/dashboard/Dashboard'
import { Routes, Route, Link,  Navigate } from "react-router-dom"
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
import AddQuestions from './views/theme/addQuestion/AddQuestion'
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
        const user = localStorage.getItem('user');
        if (user) {
          dispatch({
            type: 'USER_LOGIN',
            payload: JSON.parse(user),
          });
        }
      
      }, []);
  
      

    
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


      {/* {(state.isLogin != (null || '' || undefined) && state.isLogin === true) ?
             
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

   : null} */}

 {state.isLogin !== null && state.isLogin === true ? (
   <Routes>
     <Route path="*" element={<DefaultLayout />} />
     <Route path="*" element={<Dashboard />} />
     <Route path="*" element={<Navigate to="/" replace={true} />} />
   </Routes>
 ) : null}

 {state.isLogin === false ? (
   <Routes>
     <Route path="/" element={<Login />} />
     <Route path="*" element={<Navigate to="/" replace={true} />} />
   </Routes>
 ) : null}

 {state.isLogin === null ? (
   <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: '100vh' }}>
     <img width={100} src={Loader} alt="loading" />
   </div>
 ) : null} 

{/* <Routes>
      <Route path="/" element={<Navigate to={state.isLogin ? '/dashboard' : '/login'} />} />
      <Route path="/login" element={<Login />} />

      {state.isLogin && (
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/theme/typography" element={<Typography />} />
          <Route path="/theme/addQuestion" element={<AddQuestions />} />
          <Route path="/theme/colors" element={<Colors />} />
        </Route>
      )}

    </Routes>  */}
     {/* <Routes>
      <Route
        path="/login"
        element={!state.isLogin ? <Login /> : <Navigate to="/" replace />}
      />
      <Route
        path="/"
        element={
          state.isLogin ? (
            <DefaultLayout>
              <Route index element={<Dashboard />} />
            </DefaultLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes> */}





</>

    )
  }


export default App
