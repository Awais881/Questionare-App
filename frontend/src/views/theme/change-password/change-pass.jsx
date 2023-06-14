import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './change-pass.css';
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../../components/index'
import  DefaultLayout from '../../../layout/DefaultLayout'
const ChangePassword = () => {
  const [userEmail, setUserEmail] = useState("");
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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
  });
  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    await axios.get(
      // .get(`https://cloud1.sty-server.com/api/user`, headers)
      `http://localhost:5001/api/users`)
      .then(function (response) {
        // console.log(response?.data?.status);
        if (response?.data?.status == 200) {
          dispatch({
            type: "USER_LOGIN",
            payload: response.data.user,
          });

          // console.log(response.data.user.name)
        
          setUserEmail(response.data.user.email)
          
        }
      })
      .catch(function (error) {
        dispatch({
          type: "USER_LOGOUT",
        });
        console.error(error);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'newPassword') {
      setNewPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      setErrorMessage('New password and confirm password do not match.');
      return;
    }

    // Perform additional validation on the new password
    if (newPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters long.');
      return;
    }

    try {
      const response = await axios.put('http://localhost:5001/api/change-password', {
        email,
        newPassword,
        confirmPassword,
      });

      Toast.fire({
        icon: 'success',
        title: response.data.message,
      });

      setErrorMessage('');
      setSuccessMessage(response.data.message);
      setEmail('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
   
    <div className="change-password-container">
   
      <h2>Change Password</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={userEmail} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="change-password-button">
          Change Password
        </button>
      </form>
    </div>
    </div>
  );
};

export default ChangePassword;
