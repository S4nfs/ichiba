import React from 'react'
import { Navbar, Container, Nav, NavDropdown, Link } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../actions';
import { NavLink } from "react-router-dom";

const Header = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(signout())
  }
  const renderLoggedInLinks = () => {
    return (
      <Nav>
        <li className='nav-item'>
          <span className="nav-link" onClick={logout}>Sign out</span>
        </li>
      </Nav>
    )
  }
  const renderNonLoggedInLinks = () => {
    return (
      <Nav>
        {/* <Nav.Link href="#deets">Signin</Nav.Link> */}
        <li className='nav-item'>
          <NavLink to="signup" className="nav-link">Sign up</NavLink>
        </li>
        <li>
          <Nav.Link to="signin" className="nav-link">Sign in</Nav.Link>
        </li>
      </Nav>
    )
  }
  return (
    <>
      <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark" style={{ zIndex: 1 }}>
        <Container fluid>
          <Navbar.Brand to="/">Admin dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header