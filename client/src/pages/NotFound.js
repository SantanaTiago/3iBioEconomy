import React, { Component } from "react";
import Logo from '../assets/logo3ibio.png'
import {Link} from "react-router-dom"

class NotFound extends Component {
  
    render() {
      return (
        <div className="layout-main">
            <div class="exception-container" style={{textAlign:"center"}}>
                <img alt="Logo" src={Logo} />
                <h1>Not Found</h1>
                <p>Resource is not found.</p>
                <Link to="/">
                    <button class="p-button p-component p-button-text-icon-left">
                    <span class="pi pi-arrow-left p-c p-button-icon-left"></span>
                    <span class="p-button-text p-c">Go To Dashboard</span>
                    </button>
                </Link>
            </div>
        </div>
      );
    }
  }
  export default NotFound

