import React from "react";
import './bar-graph.styles.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Paper } from "@material-ui/core";

export default function BarGraph({data, title, dataKey, barInfo}) {
    const pageWidth = window.innerWidth - 240 - 100;
    return (
        <Paper elevation={3}>
          <h3>{title}</h3>
          <BarChart
            width={pageWidth}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 30,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={dataKey} />
            <YAxis tickFormatter={tick => tick.toLocaleString()}/>
            <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
            <Legend iconType="circle"/>
            {barInfo.map(item =>  
                <Bar dataKey={item.dataKey} name={item.name} fill={item.fill} />
            )}
          </BarChart>
          </Paper>
    )
}