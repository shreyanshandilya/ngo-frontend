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
import {useNavigate} from "react-router-dom";

function Navbar() {
    const [openNavNoTogglerThird, setOpenNavNoTogglerThird] = useState(false);
    const imagesrc = "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=626&ext=jpg&ga=GA1.1.2031671276.1700929955&semt=ais";
    const navigate = useNavigate();
    return (
        <>
            {/* <div style={{"backgroundColor":"black", "padding":"2% 0"}}>
                <div>
                    <span style={{"verticalAlign" : "middle"}}>
                        <img src={imagesrc} style={{"height":"15vh"}}></img>
                    </span>
                    <span style={{"verticalAlign":"middle"}}>
                        <button style={{"margin":"0 5%", "color":"red", "padding":"1%", "fontSize":"120%", "backgroundColor":"transparent", "color":"white", "border":"1px solid white", "borderRadius":"5px"}} onClick={()=>navigate("/login")}>LOGIN</button>
                        <button style={{"color":"red", "padding":"1%", "fontSize":"120%", "backgroundColor":"transparent", "color":"white", "border":"1px solid white", "borderRadius":"5px"}} onClick={()=>navigate("/signup")}>SIGNUP</button>
                    </span>
                </div>
            </div> */}
            <MDBNavbar expand='lg' light bgColor='light'>
        <MDBContainer fluid>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarTogglerDemo03'
            aria-controls='navbarTogglerDemo03'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setOpenNavNoTogglerThird(!openNavNoTogglerThird)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBNavbarBrand href='#'>Navbar</MDBNavbarBrand>
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
            </MDBNavbarNav>
            
            <MDBInputGroup tag="form" className='d-flex w-auto mb-3'>
              {/* <input className='form-control' placeholder="Type query" aria-label="Search" type='Search' /> */}
              <MDBBtn outline onClick={()=>navigate("/donate")}>Donate now</MDBBtn>
            </MDBInputGroup>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
        </>
    )
}

export default Navbar;