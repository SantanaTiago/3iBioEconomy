import React, { Component } from 'react';
import classNames from 'classnames';
import Avatar from '../assets/profile.png';

export class MainProfile extends Component {


    render() {
        const { user } = this.props.auth;
        return  (
            <div className="layout-profile">
                <div>
                    <img src={Avatar} alt="" />
                </div>
                    <span className="username">{user.name.split(" ")[0]}</span>
                    <i className="pi pi-fw pi-cog"/>
            </div>
        );
    }
}
