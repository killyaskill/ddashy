import React, { Component } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBIcon, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import PropTypes from "prop-types";

export default class NavigationBar extends Component {
    state = { 
        isOpen: false
    };
    toggleCollapse(){
        this.setState({isOpen: !this.state.isOpen});
    }

    render(){
        return(
            <MDBNavbar color="black" dark expand="md">
                <MDBNavbarBrand>
                    <strong className="white-text">Dashy</strong>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.toggleCollapse} />
                   <MDBCollapse id="navbarCollapse" isOpen={this.state.isOpen} navbar>
                        <MDBNavbarNav left>
                            <MDBNavItem>
                                <MDBNavLink to="/">Server Selection</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavbarNav right>
                                <MDBNavItem>
                                    <MDBDropdown>
                                        <MDBDropdownToggle nav caret>
                                            <MDBIcon icon="user"></MDBIcon>
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu className="dropdown-default">
                                            <MDBDropdownItem href="#!">{`Logout (${this.props.user.username})`}</MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                </MDBNavItem>
                            </MDBNavbarNav>
                        </MDBNavbarNav>
                        
                   </MDBCollapse>
            </MDBNavbar>
        )
    }
}

NavigationBar.PropTypes = {
    user: PropTypes.object
}