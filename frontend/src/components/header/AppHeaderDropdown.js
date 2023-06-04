import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import { useState, useContext, useEffect } from "react";
import CIcon from '@coreui/icons-react'
import { GlobalContext } from '../../context/context';
import avatar8 from './../../assets/images/avatars/8.jpg'

const AppHeaderDropdown = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const logoutHandler = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'USER_LOGOUT' });
  };
  
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
      
        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#" onClick={logoutHandler}>
          <CIcon icon={cilSettings} className="me-2" />
          Logout
        </CDropdownItem>
        
        
        <CDropdownDivider />
        
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
