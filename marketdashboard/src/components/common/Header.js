import React from 'react';
import { Link, IndexLink } from 'react-router';
/*
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
*/
const Header = ({user}) => {

  return (
      /*
      <div>
          <Navbar color="light">
            <NavbarBrand href = "/">home</NavbarBrand>
                <nav className="ml-auto">
                    <NavItem>
                        <NavLink href="/Aandelen">aandelen</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/Munten">munten</NavLink>
                    </NavItem>
                </nav>
          </Navbar>
      </div>
      */
     <div>
    <nav className="navbar navbar-default">
        <div className="container-fluid">
            <ul className="nav navbar-left">
            <li>            <IndexLink to="/" activeClassName="active">Home</IndexLink></li>
                <li><Link to="/Aandelen" activeClassName="active">Aandelen</Link></li>

                <li><Link to="/Munten" activeClassName="active">Munten</Link></li>
            </ul>
             <ul className="nav navbar-right">
             {user == null && <li><Link to="/Login" activeClassName="active">Login</Link></li> }
              {user == null &&    <li><Link to="/register" activeClassName="active">register</Link></li> }
              {user != null && <li><Link to="/user" activeClassName="active">{user.username}</Link></li>}
              {user != null && <li><Link to="/users" activeClassName="active">users</Link></li>}

            </ul>
            
        </div>
    </nav>
      

    </div>
  );
};

export default Header;