import React from "react";
import './dashboard-page.styles.css';
import BarGraph from "../../components/bar-graph/bar-graph.component";
import LineGraph from "../../components/line-graph/line-graph.component";
// import AreaGraph from "../../components/area-graph/area-graph.component";

const todayBarGraphInfo = [
  {dataKey: "todayCases", name: "New Confirmed", fill: "#0a3a79"},
  {dataKey: "todayRecovered", name: "New Recovered", fill: "#3498db"},
  {dataKey: "todayDeaths", name: "New Deaths", fill: "#5295ec"},
]

const totalBarGraphInfo = [
  {dataKey: "cases", name: "Total Confirmed", fill: "#0a3a79"},
  {dataKey: "recovered", name: "Total Recovered", fill: "#3498db"},
  {dataKey: "deaths", name: "Total Deaths", fill: "#5295ec"},
]


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
    
    return (
      <div className="dashboard-page-container">
        
          <div className="summary-container">
              <div className="summary-block">
                <div className="title">Confirmed cases</div>
                <div className="tite-text1" style={{color: '#0a3a79', fontWeight: 'bold'}}><div>Total </div><div>{summary.cases?.toLocaleString()}</div></div>
                <div className="title-text2" style={{color: "#3498db", fontWeight: 'bold'}}><div>New </div><div>{summary.todayCases?.toLocaleString()}</div></div>
              </div>
              <div className="summary-block">
                <div className="title">Recovered cases</div>
                <div className="tite-text1" style={{color: '#0a3a79', fontWeight: 'bold'}}><div>Total </div><div>{summary.recovered?.toLocaleString()}</div></div>
                <div className="title-text2" style={{color: "#3498db", fontWeight: 'bold'}}><div>New </div><div>{summary.todayRecovered?.toLocaleString()}</div></div>
              </div>
              <div className="summary-block">
                <div className="title">Fatal cases</div>
                <div className="tite-text1" style={{color: '#0a3a79', fontWeight: 'bold'}}><div>Total </div><div>{summary.deaths?.toLocaleString()}</div></div>
                <div className="title-text2" style={{color: "#3498db", fontWeight: 'bold'}}><div>New </div><div>{summary.todayDeaths?.toLocaleString()}</div></div>
              </div>
          </div>
          <div>
            <BarGraph data={newConfirmedGraphData} title={"Today's statistics for top 10 affected countries"} dataKey="country" barInfo={todayBarGraphInfo}/>
          </div>
          <div style={{marginTop: 20}}>
            <BarGraph data={totalConfirmedGraphData} title={"Total statistics for top 10 affected countries"} dataKey="country" barInfo={totalBarGraphInfo}/>
          </div>
          <div style={{marginTop: 20}}>
            <LineGraph data={totalConfirmedGraphData} title={"Cases per million people for top 10 affected countries"} dataKey="casesPerOneMillion" name="Cases per million people" stroke="0a3a79"/>
          </div>
        </div>
      );
    }
}