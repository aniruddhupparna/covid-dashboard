import React from "react";
import './dashboard-page.styles.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Paper } from "@material-ui/core";


export default class Dashboard extends React.Component {
  constructor() {
    super()
    this.state = {
      totalConfirmedGraphData: [],
      newConfirmedGraphData: [],
      summary: {}
    }
  }

  fetchSummary = () => {
    const url = 'https://disease.sh/v3/covid-19/all'
    fetch(url)
        .then(res => res.json())
        .then(data => {
          this.setState({
            summary: data
          });
        });
  }

  fetchGraphData =()=> {
    const url = 'https://disease.sh/v3/covid-19/countries';
    fetch(url+'?sort=todayCases')
        .then(res => res.json())
        .then(data => {
          const newConfirmedGraphData = data.slice(0, 10);
          this.setState({
            newConfirmedGraphData
          });
        });
    fetch(url+'?sort=cases')
      .then(res => res.json())
      .then(data => {
        const totalConfirmedGraphData = data.slice(0,10);
        this.setState({
          totalConfirmedGraphData
        });
      });
  }
    
  componentDidMount() {
    this.fetchSummary();
    this.fetchGraphData();
  }
    
  render(){
    const {totalConfirmedGraphData, newConfirmedGraphData, summary} = this.state;
    // 100px offset 240px for sidenav
    const pageWidth = window.innerWidth - 240 - 100;
    return (
      <div className="dashboard-page-container">
        
          <div className="summary-container">
              <div className="summary-block" style={{background: '#ff6682'}}>
                <div className="title">Confirmed cases</div>
                <div className="tite-text1"><div>Total </div><div>{summary.cases?.toLocaleString()}</div></div>
                <div className="title-text2"><div>New </div><div>{summary.todayCases?.toLocaleString()}</div></div>
              </div>
              <div className="summary-block" style={{background: '#3edabb'}}>
                <div className="title">Recovered cases</div>
                <div className="tite-text1"><div>Total </div><div>{summary.recovered?.toLocaleString()}</div></div>
                <div className="title-text2"><div>New </div><div>{summary.todayRecovered?.toLocaleString()}</div></div>
              </div>
              <div className="summary-block" style={{background: '#ffbf65'}}>
                <div className="title">Fatal cases</div>
                <div className="tite-text1"><div>Total </div><div>{summary.deaths?.toLocaleString()}</div></div>
                <div className="title-text2"><div>New </div><div>{summary.todayDeaths?.toLocaleString()}</div></div>
              </div>
          </div>
          <div>
          <Paper elevation={3}>
          <h3>Today's statistics for top 10 affected countries</h3>
          <BarChart
            width={pageWidth}
            height={300}
            data={newConfirmedGraphData}
            margin={{
              top: 5,
              right: 30,
              left: 30,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="country" />
            <YAxis tickFormatter={tick => tick.toLocaleString()}/>
            <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />          
            <Legend iconType="circle"/>
            <Bar dataKey="todayCases" name="New Confirmed" fill="#0a3a79" />
            <Bar dataKey="todayRecovered" name="New Recovered" fill="#3498db" />
            <Bar dataKey="todayDeaths" name="New Deaths" fill="#5295ec" />
          </BarChart>
          </Paper>
          </div>
          <div style={{marginTop: 20}}>
          <Paper elevation={3}>
          <h3>Total statistics for top 10 affected countries</h3>
          <BarChart
            width={pageWidth}
            height={300}
            data={totalConfirmedGraphData}
            margin={{
              top: 5,
              right: 30,
              left: 30,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="country" />
            <YAxis tickFormatter={tick => tick.toLocaleString()}/>
            <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
            <Legend iconType="circle"/>
            <Bar dataKey="cases" name="Total Confirmed" fill="#0a3a79" />
            <Bar dataKey="recovered" name="Total Recovered" fill="#3498db" />
            <Bar dataKey="deaths" name="Total Deaths" fill="#5295ec" />
          </BarChart>
          </Paper>
          </div>
        </div>
      );
    }
}