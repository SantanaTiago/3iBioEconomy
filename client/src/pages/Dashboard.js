import React, { useEffect, useState } from 'react'
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css'
import Energy from '../assets/energy.png'
import Water from '../assets/water.png'
import socketIOClient from "socket.io-client";
import {Chart} from 'primereact/chart';
const ENDPOINT = "http://localhost:5000";

export default function Dashboard() {
    const [response, setResponse] = useState("");
    const [lineData]=useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Treated Water',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: '#007be5'
            },
            {
                label: 'Energy Produced',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                borderColor: '#20d077'
            }
        ]
    });

    // async function getData() {
    //     await api.getEntradaLast().then(res => {
    //         setData(res.data.data); 
    //         console.log(res.data.data);
    //   });
    // }

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("FromAPI", data => {
          setResponse(data);
        });
        // CLEAN UP THE EFFECT
        return () => socket.disconnect();
        //
      }, []);

    //   useEffect(function getEntrada() {
    //     getData();
    //   }, []);
    
    // componentDidMount = async () => {
    //     this.setState({ isLoading: true })

    //     await api.getEntradaLast().then(res => {
    //         var tempPH=[];
    //         var tempTemp=[];
    //         var tempCond=[];
    //         var tempSal=[];
    //         var tempTDS=[];
    //         var tempDate=[];
    //         console.log(res);
    //         for (let i = 9; i >= 0; i--) {
    //             tempPH.push(res.data.data[i].data.PH);
    //             tempTemp.push(res.data.data[i].data.TempPH);
    //             tempCond.push(res.data.data[i].data.Condutivity);
    //             tempSal.push(res.data.data[i].data.Salinity);
    //             tempTDS.push(res.data.data[i].data.TDS);
    //             tempDate.push(new Date(res.data.data[i].timestamp*1000).toISOString().replace(/T/, ' ').replace(/\..+/, ''));
    //         }
    //         this.setState({dataEntradaPH:tempPH, dataEntradaTemp:tempTemp, dataEntradaCondutivity:tempCond, dataEntradaSalinity:tempSal, dataEntradaTDS:tempTDS, dateEntradaTank:tempDate})
    //     })
    //     await api.getSaidaLast().then(res => {
    //         var tempPH=[];
    //         var tempTemp=[];
    //         var tempCond=[];
    //         var tempSal=[];
    //         var tempTDS=[];
    //         var tempDate=[];
    //         console.log(res);
    //         for (let i = 9; i >= 0; i--) {
    //             tempPH.push(res.data.data[i].data.PH);
    //             tempTemp.push(res.data.data[i].data.TempPH);
    //             tempCond.push(res.data.data[i].data.Condutivity);
    //             tempSal.push(res.data.data[i].data.Salinity);
    //             tempTDS.push(res.data.data[i].data.TDS);
    //             tempDate.push(new Date(res.data.data[i].timestamp*1000).toISOString().replace(/T/, ' ').replace(/\..+/, ''));
    //         }
    //         this.setState({dataSaidaPH:tempPH, dataSaidaTemp:tempTemp, dataSaidaCondutivity:tempCond, dataSaidaSalinity:tempSal, dataSaidaTDS:tempTDS, dateSaidaTank:tempDate})
    //     })
    // }

    // componentDidUpdate() {
    //     console.log("entrou no update");
    //     console.log(this.props.value);
    // }

        // const { dataEntradaPH, dateEntradaTank,  dataSaidaPH, 
        //     dataEntradaTemp,dataSaidaTemp,
        //     dataEntradaCondutivity,dataSaidaCondutivity,
        //     dataEntradaSalinity, dataSaidaSalinity,
        //     dataEntradaTDS, dataSaidaTDS} = this.state

        // const dataLinePH = {
        //     labels: dateEntradaTank,
        //     datasets: [
        //         {
        //             label: 'Entrance Tank PH',
        //             data: dataEntradaPH,
        //             fill: false,
        //             backgroundColor: '#20d077',
        //             borderColor: '#20d077'
        //         },
        //         {
        //             label: 'Exit Tank PH',
        //             data: dataSaidaPH,
        //             fill: false,
        //             backgroundColor: '#ffad0a',
        //             borderColor: '#ffad0a'
        //         }
        //     ]
        // };

        // const dataLineTemp = {
        //     labels: dateEntradaTank,
        //     datasets: [
        //         {
        //             label: 'Entrance Tank PH',
        //             data: dataEntradaTemp,
        //             fill: false,
        //             backgroundColor: '#20d077',
        //             borderColor: '#20d077'
        //         },
        //         {
        //             label: 'Exit Tank PH',
        //             data: dataSaidaTemp,
        //             fill: false,
        //             backgroundColor: '#ffad0a',
        //             borderColor: '#ffad0a'
        //         }
        //     ]
        // };

        // const dataLineCond = {
        //     labels: dateEntradaTank,
        //     datasets: [
        //         {
        //             label: 'Entrance Tank PH',
        //             data: dataEntradaCondutivity,
        //             fill: false,
        //             backgroundColor: '#20d077',
        //             borderColor: '#20d077'
        //         },
        //         {
        //             label: 'Exit Tank PH',
        //             data: dataSaidaCondutivity,
        //             fill: false,
        //             backgroundColor: '#ffad0a',
        //             borderColor: '#ffad0a'
        //         }
        //     ]
        // };

        // const dataLineSalin = {
        //     labels: dateEntradaTank,
        //     datasets: [
        //         {
        //             label: 'Entrance Tank PH',
        //             data: dataEntradaSalinity,
        //             fill: false,
        //             backgroundColor: '#20d077',
        //             borderColor: '#20d077'
        //         },
        //         {
        //             label: 'Exit Tank PH',
        //             data: dataSaidaSalinity,
        //             fill: false,
        //             backgroundColor: '#ffad0a',
        //             borderColor: '#ffad0a'
        //         }
        //     ]
        // };

        // const dataLineTDS = {
        //     labels: dateEntradaTank,
        //     datasets: [
        //         {
        //             label: 'Entrance Tank PH',
        //             data: dataEntradaTDS,
        //             fill: false,
        //             backgroundColor: '#20d077',
        //             borderColor: '#20d077'
        //         },
        //         {
        //             label: 'Exit Tank PH',
        //             data: dataSaidaTDS,
        //             fill: false,
        //             backgroundColor: '#ffad0a',
        //             borderColor: '#ffad0a'
        //         }
        //     ]
        // };

        const header = (
            <img alt="Card" src={Energy}/>
        );

        const headerWater = (
            <img alt="Card" src={Water}/>
        );

        return (
            <div className="p-grid p-fluid dashboard">
                <div className="p-col-12 p-lg-4">
                    <div className="card summary">
                        <span className="title">PH</span>
                        <span className="detail">Exit Tank</span>
                        <span className="count visitors">7.67</span>
                    </div>
                </div>
                <div className="p-col-12 p-lg-4">
                    <div className="card summary">
                        <span className="title">Temperature</span>
                        <span className="detail">Ambient</span>
                        <span className="count purchases">33.3º</span>
                    </div>
                </div>
                <div className="p-col-12 p-lg-4">
                    <div className="card summary">
                        <span className="title">Humidity</span>
                        <span className="detail">Ambient</span>
                        <span className="count revenue">35.7%</span>
                    </div>
                </div>
                <div className="p-col-12 p-md-6 p-xl-3">
                    <div className="highlight-box">
                        <div className="initials" style={{backgroundColor:'#007be5',color:'#00448f'}}><span>TW</span></div>
                        <div className="highlight-details ">
                           
                            <span>Treated Water</span>
                            <span className="count">125</span>
                        </div>
                    </div>
                </div>
                <div className="p-col-12 p-md-6 p-xl-3">
                    <div className="highlight-box">
                        <div className="initials" style={{backgroundColor:'#ef6262',color:'#a83d3b'}}><span>TI</span></div>
                        <div className="highlight-details ">
                            
                            <span>Total Issues</span>
                            <span className="count">81</span>
                        </div>
                    </div>
                </div>
                <div className="p-col-12 p-md-6 p-xl-3">
                    <div className="highlight-box">
                        <div className="initials" style={{backgroundColor:'#20d077',color:'#038d4a'}}><span>EP</span></div>
                        <div className="highlight-details ">
                            
                            <span>Energy Produced</span>
                            <span className="count">300W</span>
                        </div>
                    </div>
                </div>
                <div className="p-col-12 p-md-6 p-xl-3">
                    <div className="highlight-box">
                        <div className="initials" style={{backgroundColor:'#f9c851',color:'#b58c2b'}}><span>CI</span></div>
                        <div className="highlight-details ">
                           
                            <span>Closed Issues</span>
                            <span className="count">60</span>
                        </div>
                    </div>
                </div>
                <div className="p-col-12 p-lg-6">
                    <div className="card">
                        <Chart type="line" data={lineData}/>
                    </div>
                </div>
                <div className="p-col-12 p-lg-6">
                    <div className="card">
                        <Chart type="line" data={lineData}/>
                    </div>
                </div>
            </div>
        )
}