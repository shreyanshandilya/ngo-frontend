import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBBtn,
  MDBNavbarNav,
  MDBIcon,
  MDBInputGroup
} from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";

function Navbar() {
  const handleLogout = () => {
    let navto = '/';
    if (localStorage.role == 'admin') {
      navto = '/admin/login'
    }
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    navigate(navto);
  }

  const [openNavNoTogglerThird, setOpenNavNoTogglerThird] = useState(false);
  const imagesrc = "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=626&ext=jpg&ga=GA1.1.2031671276.1700929955&semt=ais";
  const navigate = useNavigate();
  return (
    <>
      <MDBNavbar sticky expand='lg' light bgColor='light'>
        <MDBContainer fluid>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarTogglerDemo03'
            aria-controls='navbarTogglerDemo03'
            aria-expanded='false'
            aria-label='Toggle navigation'
            style={{ 'backgroundColor': 'grey' }}
            onClick={() => setOpenNavNoTogglerThird(!openNavNoTogglerThird)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBNavbarBrand href='#'><strong>NGO</strong></MDBNavbarBrand>
          <MDBCollapse navbar open={openNavNoTogglerThird}>
            <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
              <MDBNavbarItem>
                <MDBNavbarLink active aria-current='page' href='/'>
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='#'>About us</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/view' tabIndex={-1} aria-disabled='true'>
                  Products
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                {localStorage.role == 'agent' ? <MDBNavbarLink active aria-current='page' href='/agent/profile'>Profile</MDBNavbarLink> : <></>}
                {localStorage.role == 'donor' ? <MDBNavbarLink active aria-current='page' href='/profile'>Profile</MDBNavbarLink> : <></>}
              </MDBNavbarItem>
            </MDBNavbarNav>
            <MDBInputGroup style={{ 'alignItems': 'center', 'justifyContent': 'center' }} tag="form" className='d-flex w-auto mb-3'>
              {!localStorage.role ? <>
                <MDBBtn className='button' style={{ 'width': 'fit-content' }} outline onClick={() => navigate("/donate")}>Donate</MDBBtn>
              </> : <></>}
              {localStorage.role == 'donor' ?
                <MDBBtn className='donate' style={{ 'width': 'fit-content', 'marginBottom': '0%', 'marginRight': '0%', 'border': 'none', 'color': 'white' }} outline onClick={() => navigate("/donate_product")}>Donate</MDBBtn>
                : <></>}
              {(localStorage.role == 'donor' | localStorage.role == 'agent' | localStorage.role == 'admin') ?
                <MDBBtn className='donate' style={{ 'width': 'fit-content', 'marginBottom': '0%', 'backgroundColor': 'red', 'border': 'none', 'color': 'white' }} outline onClick={handleLogout}>Logout</MDBBtn>
                : <></>}
            </MDBInputGroup>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  )
}

export default Navbar;