import React from 'react'
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css'

export default function Operator() {
    
    return(
        <div className="p-grid p-fluid dashboard">
        <div className="p-col-12 p-md-6 p-xl-4">
            <div className="highlight-box">
                <div className="initials" style={{backgroundColor:'#20d077'}}><i className='pi pi-chevron-down' style={{fontSize:"xxx-large",fontWeight:"bold"}}></i></div>
                <div className="highlight-details ">
                    <span>Entrance Tank</span>
                        <span className="count">ok</span>
                </div>
            </div>
        </div>
        <div className="p-col-12 p-md-6 p-xl-4">
            <div className="highlight-box">
                <div className="initials" style={{backgroundColor:'#fff207'}}><i className='pi pi-circle-on' style={{fontSize:"xxx-large",fontWeight:"bold"}}></i></div>
                <div className="highlight-details ">
                    <span>Geral Tank</span>
                    <span className="count">ok</span>
                </div>
            </div>
        </div>
        <div className="p-col-12 p-md-6 p-xl-4">
            <div className="highlight-box">
                <div className="initials" style={{backgroundColor:'#ffad0a'}}><i className='pi pi-chevron-up' style={{fontSize:"xxx-large",fontWeight:"bold"}}></i></div>
                <div className="highlight-details ">
                    <span>Exit Tank</span>
                    <span className="count">ok</span>
                </div>
            </div>
        </div>
    </div>
    )

}