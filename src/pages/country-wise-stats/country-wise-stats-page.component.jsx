import React, { Fragment } from 'react';
import { Paper, TextField } from '@material-ui/core';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default class CountrywiseStats extends React.Component {
  constructor() {
    super()
    this.state = {
      countries: [],
      selectedCountry: "",
      graphData: [] 
    }
  }
  
  setCountries = () => {
    const url = 'https://disease.sh/v3/covid-19/countries';
    fetch(url).then(res => res.json()).then(data => {
      const countries = data.map(item => {return {country: item?.country, flag: item?.countyInfo?.flag}})
      this.setState({
        countries,
        selectedCountry: countries[0]?.country
      }, ()=> {this.populateGraph();})
    });
  }

  populateGraph = () => {
    const url = 'https://api.covid19api.com/country/'+ this.state.selectedCountry;
    fetch(url).then(res => res.json()).then(data => {
      this.setState({graphData: data})
    })
  }

  componentDidMount() {
    this.setCountries();
  }

  handleChange = (e ,newVal) => {
   this.setState({selectedCountry: newVal?.country}, 
    ()=> {
      this.populateGraph()
    })
  }

  render() {
    const {countries, selectedCountry, graphData} = this.state;
    const pageWidth = window.innerWidth - 240 - 100;

    return (
      <Fragment>
          <Autocomplete
            id="combo-box-demo"
            options={countries}
            getOptionLabel={(option) => option?.country}
            style={{ width: 300, marginBottom: 100 }}
            onChange={this.handleChange}
            defaultValue={{country: 'Afghanistan', flag: ''}}
            renderInput={(params) => <TextField {...params} label="Select a country" variant="outlined" />}
          />
          {selectedCountry && 
          <Paper elevation={3}>
            <AreaChart
              width={pageWidth}
              height={500}
              data={graphData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 100,
              }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Date" angle="290" tickFormatter={(value) => value.toString().slice(0,10)} tickMargin="40"/>
            <YAxis />
            <Tooltip formatter={(value) => value.toString().slice(0,10)}/>
            <Legend iconType="circle" verticalAlign="top" />
            <Area type="monotone" dataKey="Active" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
          </Paper>
          }
       </Fragment> 
    );
    }
}
