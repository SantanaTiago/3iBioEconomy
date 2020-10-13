import React, { Component } from 'react'
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'
import {Button} from 'primereact/button';
import api from '../api'
import {ProgressSpinner} from 'primereact/progressspinner';

class Geral extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sensorData: null,
            isLoading: false,
        }
        this.export = this.export.bind(this);
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getGeral().then(res => {
            this.setState({
                sensorData: res.data.data,
                isLoading: false,
            })
        })
    }

    export() {
        this.dt.exportCSV();
    }

    dateTemplate(rowData, column) {
        return new Date(rowData['timestamp']*1000).toISOString().slice(0, 19).replace('T', ' ');
    }


    render() {
        const { sensorData} = this.state

        var header = <div style={{textAlign:'left'}}><Button type="button" icon="pi pi-external-link" iconPos="left" label="CSV" onClick={this.export}></Button></div>;
        
        return (
            <div className="p-grid p-fluid dashboard">
                {this.state.isLoading && <ProgressSpinner/>}
                {!this.state.isLoading && <DataTable value={sensorData} paginator rows={25} dataKey="_id" header={header} ref={(el) => { this.dt = el; }}>
                    <Column field="timestamp" body={this.dateTemplate} header="Date" sortable={true}/>
                    <Column field="data.Temp" header="Temperature" />
                    <Column field="data.WaterLevel" header="Water Level" />
                </DataTable> }
            </div>
        )
    }
}

export default Geral
