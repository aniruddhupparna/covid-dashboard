import React from "react";
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart } from 'recharts';
import { Paper } from "@material-ui/core";

export default function LineGraph ({data, title, dataKey, name, stroke}) {
  const pageWidth = window.innerWidth - 240 - 100;
    return (
      <Paper elevation={3}>
        <h3>{title}</h3>
        <LineChart
        width={pageWidth}
        height={500}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 100,
        }}
      >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="country" angle="290" tickFormatter={(value) => value.toString().slice(0,10)} tickMargin="40"/>
      <YAxis />
      <Tooltip formatter={(value) => value.toString().slice(0,10)}/>
      <Legend iconType="circle" verticalAlign="top" />
      <Line type="monotone" dataKey={dataKey} name={name} fill={stroke}  />
    </LineChart>
    </Paper>
    )
} 