import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import { useState, useContext, useEffect } from "react";
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import { GlobalContext } from '../../../context/context';
import axios from 'axios';
import Swal from 'sweetalert2'
import { Link, useNavigate, useLocation } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [user, setUser] = useState(localStorage.getItem("user"));
  const { state, dispatch } = useContext(GlobalContext);

  const navigate = useNavigate();
  
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true
  })



  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      let response = await axios.post("https://questionare-server-production.up.railway.app/api/login" , {
        email: email,
        password: password});
    
        if (response.status === 200) {
          // const user_email = response.data.profile.email;
          // localStorage.setItem("email", user_email);
          localStorage.setItem('user', JSON.stringify(response.data.profile));

          dispatch({
            type: 'USER_LOGIN',
            payload: response.data.profile
           
        
        })
        console.log("email: ", response);
      }
        console.log("state: ", state);
       
      Toast.fire({
        icon: 'success',
        title: response.data.message
      })
     
      console.log("Login successful");
    } catch (err) {
      dispatch({
        type: 'USER_LOGOUT',
       
    
    })
      console.log("Error: ", err);
      
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
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm method='post' onSubmit={loginHandler}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        onChange={(e) => setEmail(e.target.value)}
                        type='email'
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type='submit'>
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
