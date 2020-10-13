import React, {Component} from 'react'
import { Route, HashRouter, Switch} from 'react-router-dom'
import classNames from 'classnames'
import { Entrada, Geral, Saida, Dashboard, Settings, Manager, Operator } from '../pages'
import {AppTopbar} from '../components'
import {MainMenu} from './MainMenu'
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Avatar from '../assets/profile.png'
import Logo from '../assets/logo3ibio.png'

import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import '../layout/layout.scss'
import { logoutUser } from "../actions/authActions";
import ScrollToTop from '../ScrollToTop'
import NotFound from './NotFound'

class Main extends Component {

  constructor() {
    super();
    this.state = {
        layoutMode: 'static',
        layoutColorMode: 'dark',
        staticMenuInactive: false,
        overlayMenuActive: false,
        mobileMenuActive: false,
        socketData: null,
        socket:null,
    };

    this.onWrapperClick = this.onWrapperClick.bind(this);
    this.onToggleMenu = this.onToggleMenu.bind(this);
    this.onSidebarClick = this.onSidebarClick.bind(this);
    this.onMenuItemClick = this.onMenuItemClick.bind(this);
    this.createMenu();
  }

  onWrapperClick(event) {
    if (!this.menuClick) {
        this.setState({
            overlayMenuActive: false,
            mobileMenuActive: false
        });
    }

    this.menuClick = false;
  }

  onToggleMenu(event) {
    this.menuClick = true;

    if (this.isDesktop()) {
        if (this.state.layoutMode === 'overlay') {
            this.setState({
                overlayMenuActive: !this.state.overlayMenuActive
            });
        }
        else if (this.state.layoutMode === 'static') {
            this.setState({
                staticMenuInactive: !this.state.staticMenuInactive
            });
        }
    }
    else {
      const mobileMenuActive = this.state.mobileMenuActive;
      this.setState({
          mobileMenuActive: !mobileMenuActive
      });
    }
    event.preventDefault();
  }

  onSidebarClick(event) {
    this.menuClick = true;
  }

  onMenuItemClick(event) {
    if(!event.item.items) {
        this.setState({
            overlayMenuActive: false,
            mobileMenuActive: false
        })
    }
  }

  createMenu() {
    this.menu = [
        {label: 'Dashboard', icon: 'pi pi-fw pi-home', command: () => {window.location = '#/'}},
        {label: 'Research', icon: 'pi pi-file-o',items:[ 
        {label: 'Entrance Tank', icon: 'pi pi-chevron-down', command: () => {window.location = '#/entrada'}},
        {label: 'Geral Tank', icon: 'pi pi-circle-on', command: () => {window.location = '#/geral'}},
        {label: 'Exit Tank', icon: 'pi pi-chevron-up', command: () => {window.location = '#/saida'}}]},
        {label: 'Operator', icon: 'pi pi-user', command: () => {window.location = '#/operator'}},
        {label: 'Manager', icon: 'pi pi-users', command: () => {window.location = '#/manager'}},
        {label: 'Administrator', icon: 'pi pi-fw pi-cog', command: () => {window.location = '#/settings'}},
        {label: 'Logout', icon: 'pi pi-eject', command: () => {this.props.logoutUser()}}
    ];
  }

  addClass(element, className) {
    if (element.classList)
        element.classList.add(className);
    else
        element.className += ' ' + className;
  }

  removeClass(element, className) {
      if (element.classList)
          element.classList.remove(className);
      else
          element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }

  isDesktop() {
      return window.innerWidth > 1024;
  }

  componentDidUpdate() {
      if (this.state.mobileMenuActive)
          this.addClass(document.body, 'body-overflow-hidden');
      else
          this.removeClass(document.body, 'body-overflow-hidden');
  }

  render(){

    const wrapperClass = classNames('layout-wrapper', {
      'layout-overlay': this.state.layoutMode === 'overlay',
      'layout-static': this.state.layoutMode === 'static',
      'layout-static-sidebar-inactive': this.state.staticMenuInactive && this.state.layoutMode === 'static',
      'layout-overlay-sidebar-active': this.state.overlayMenuActive && this.state.layoutMode === 'overlay',
      'layout-mobile-sidebar-active': this.state.mobileMenuActive
    });

    const sidebarClassName = classNames("layout-sidebar", {
      'layout-sidebar-dark': this.state.layoutColorMode === 'dark',
      'layout-sidebar-light': this.state.layoutColorMode === 'light'
    });

    const { user } = this.props.auth;

    return (
       <div className={wrapperClass} onClick={this.onWrapperClick}>
          <AppTopbar onToggleMenu={this.onToggleMenu}/>
          <div ref={(el) => this.sidebar = el} className={sidebarClassName} onClick={this.onSidebarClick}>
              <div className="layout-profile">
                <div>
                    <img src={Avatar} alt="" />
                </div>
                    <span className="profileName">{user.name.split(" ")[0]}</span>
              </div>
              <MainMenu model={this.menu} onMenuItemClick={this.onMenuItemClick} />
              <div className="layout-logo logo">
                  <img alt="Logo" src={Logo} style={{ width: "100%"}} />
              </div>
          </div>

          <div className="layout-main">
          <HashRouter>
            <ScrollToTop>
            <Switch>
                <Route exact path="/" component={Dashboard}/>
                <Route exact path="/entrada" component={Entrada} />
                <Route exact path="/geral"component={Geral} />
                <Route exact path="/saida" component={Saida} />
                <Route exact path="/manager" component={Manager} />
                <Route exact path="/operator" component={Operator} />
                <Route exact path="/settings" render={()=> <Settings userName={user} />} />
                <Route component={NotFound} />
              </Switch>
            </ScrollToTop>
          </HashRouter>
          </div>
          <div className="layout-mask"></div>
      </div>
    )
  };
}

Main.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Main);
