import React, {useRef} from 'react'
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import {Growl} from 'primereact/growl';

export default function Manager() {

    let growl = useRef(null);
    
    return(
    <div>
        <div className="p-grid p-fluid dashboard">
            <Growl ref={growl} />
            <div className="p-col-12 p-md-6 p-xl-4">
                <h1>manager page</h1>
            </div>
       
        </div>

    </div>
    )

}