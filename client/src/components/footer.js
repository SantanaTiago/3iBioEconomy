import React, { Component } from 'react';

class AppFooter extends Component {

    render() {
        return  (
            <div className="layout-footer">
                <span className="footer-text" style={{'marginRight': '5px'}}>Workplace </span>
		<span className="footer-text">3iBio </span>
                <span className="footer-text" style={{'marginLeft': '5px'}}>By Line</span>
            </div>
        );
    }
}

export default AppFooter
