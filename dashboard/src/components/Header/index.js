import React from 'react'
import { Navbar, Container, Nav, NavDropdown, NavLink, Link } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../actions';

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
          <span className="nav-link" onClick={logout}>Signout</span>
        </li>

      </Nav>
    )
  }
  const renderNonLoggedInLinks = () => {
    return (
      <Nav>
        {/* <Nav.Link href="#deets">Signin</Nav.Link> */}
        <li className='nav-item'>
          <NavLink href="signup" className="nav-link">Signup</NavLink>
        </li>
        <li>
          <Nav.Link href="signin" className="nav-link">Signin</Nav.Link>
        </li>
      </Nav>
    )
  }
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ zIndex: 1 }}>
        <Container fluid>
          <Navbar.Brand href="/">Admin dashboard</Navbar.Brand>
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