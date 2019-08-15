import React from 'react';
import { connect } from 'react-redux'
import {
    Nav,
    Navbar
} from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import {
    logoutUser
} from '../../redux/security/security.action'

export const Header = ({ 
    email, 
    isLoggedIn,
    onLogOut }) => {
    return (
        <Navbar bg="dark" variant="dark">
            <Link className="navbar-brand" to="/">React-Login
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLinkWrapper to="/" exact>Home</NavLinkWrapper>
                </Nav>
            </Navbar.Collapse>
            {
                isLoggedIn &&
                <Navbar.Text>
                    <span style={{ color: 'white' }}>{email}</span> {' '}
                    <button className="btn btn-sm btn-outline-light my-2 my-sm-0" onClick={onLogOut}>Logout</button>
                </Navbar.Text>
            }
        </Navbar>
    );
}

const NavLinkWrapper = ({ to, children, exact }) => (
    <NavLink
        className="nav-link"
        activeClassName="active"
        to={to}
        exact={exact}>
        {children}
    </NavLink>
)

const mapStateToProps = (state) => {
    return {
        email: state.Security.email,
        isLoggedIn: state.Security.isLoggedIn
    };
};

const mapDispatchToProps = {
    onLogOut: logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);