import React, { useEffect, useState, useRef } from 'react'
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import socketIOClient from "socket.io-client";
import {Dropdown} from 'primereact/dropdown';
import {Button} from 'primereact/button';
import {Growl} from 'primereact/growl';
import {Card} from 'primereact/card';
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'
import api from '../api'
import { Formik, Field } from 'formik';
import { Form, Input} from 'react-formik-ui';
import * as Yup from 'yup';
const ENDPOINT = "http://localhost:5000";


export default function Settings(props) {
    const [value, setValue] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(true);

    let growl = useRef(null);
    let dt = useRef(null);

    async function getData() {
        await api.getGeralLast().then(res => {
            setData(res.data.data); 
            console.log(res.data.data);
            setIsLoading(false);
      });
    }

    const items = [
        { sensor: "Temperature", level: "less 20º" },
        { sensor: "Temperature", level: "more 30º" },
        { sensor: "Humidity", level: "less 40%" },
        { sensor: "Humidity", level: "more 60%" },
        { sensor: "Ca2+", level: "less 200ppm" },
        { sensor: "Ca2+", level: "more 400ppm" }
      ];

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.emit("getInterval");
        socket.on("Interval", data => {
            setValue(data);
        });
        // CLEAN UP THE EFFECT
        return () => socket.disconnect();
        //
      }, []);
    
    useEffect(function getEntrada() {
        getData();
    }, []);
    
    const MeasureSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        sensor: Yup.string()
            .required('Required'),
        lessMore: Yup.string()
            .required('Required'),
        value: Yup.number()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required')
      })


    const exports = (e) => {
        e.dt.exportCSV();
    };

    let intervals = [
        {label: '30sec', value: 30000},
        {label: '40sec', value: 40000},
        {label: '50sec', value: 50000},
        {label: '60sec', value: 60000},
        {label: '80sec', value: 80000},
        {label: '100sec', value: 100000},
        {label: '120sec', value: 120000},
    ];

    const onIntervalChange = (e) => {
        setValue(e.value);
    };

    const dateTemplate = (rowData, column) => {
        return new Date(rowData['timestamp']*1000).toISOString().slice(0, 19).replace('T', ' ');
    };

    const showSuccessInterval = () => {
        growl.current.show({severity: 'success', summary: 'Success', detail: 'Interval have been saved'});
    }

    const footer = <span>
                    <Button label="Save" onClick={showSuccessInterval} style={{marginRight: '.25em'}}/>
                </span>;
    
    const header = <div style={{textAlign:'left'}}><Button type="button" icon="pi pi-external-link" iconPos="left" label="CSV" onClick={exports}></Button></div>;
    return(
        
        <div>
            <div className="p-grid p-fluid dashboard">
                <Growl ref={growl} />
                <div className="p-col-12 p-md-6 p-xl-4">
                    <Card footer={footer} title="Interval of Data">
                        <Dropdown value={value} options={intervals} onChange={onIntervalChange} style={{width: '12em'}}
                                    filter={true} filterPlaceholder="Select Inteval" filterBy="label,value" showClear={true}/>
                        <div style={{marginTop: '.5em'}}>{value ? 'Selected Interval: ' + value : 'No interval selected'}</div>
                    </Card>
                    
                </div>
           
                <div className="p-col-12 p-md-6 p-xl-4">
                    <Card title="Create New Alert">
                    <div className="content-section implementation">
                    <Formik validationSchema={MeasureSchema}
                            initialValues={{
                                sensor: '',
                                email:'',
                                name: props.userName.name,
                                value:''
                            }}
                            onSubmit={values => {
                                // same shape as initial values
                                console.log(values);
                            }}
                        >   
                        {({ values, errors, touched, handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting }) => (
                        <Form mode='themed'>

                            <Input name="name" value={values.name} type="text" placeholder="Name" disabled={true}/>
                            {errors.name && touched.name ? (
                                <div>{errors.name}</div>
                            ) : null}
                            <br></br>
                            <Input name="email" value={values.email} type="email" placeholder="Email" />
                            
                            <br></br>
                            <h6>Sensor to watch</h6>
                            
                            <Field name="sensor" as="select" onChange={handleChange} placeholder="Select Sensor" style={{display:"block"}}>
                            
                            {Array.from(new Set(items.map((item)=>item.sensor))).map((sensor, index) => (
                                <>
                                <option value={sensor} >{sensor}</option>
                                </>
                            ))}
                            </Field>
                            <Field name="level" as="select" onChange={handleChange} style={{display:"block"}}>
                            
                            {items.filter((item)=>item.sensor===values.sensor).map((item, index) => (
                                <option value={item.level}>{item.level}</option>
                            ))}
                            </Field>


                            {<Button name="submit" label="Submit Alert" type="submit" className="p-button-success" ></Button>}
                        </Form>
                        )}
                        </Formik>
                        </div>
                    </Card>
                    
                </div>
                <div className="p-col-12 p-md-6 p-xl-4">
                    <Card title="List of Alerts">
                    {!isLoading && <DataTable value={data} paginator rows={25} dataKey="_id" header={header} ref={dt}>
                        <Column field="timestamp" body={dateTemplate} header="Date" sortable={true}/>
                        <Column field="data.Temp" header="Temperature" />
                        <Column field="data.WaterLevel" header="Water Level" />
                    </DataTable> }
                    </Card>
                    
                </div>
            </div>

        </div>
    )
}
