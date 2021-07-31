import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Paper } from "@material-ui/core";

export default function AreaGraph({data, title, dataKey, barInfo}) {
    const pageWidth = window.innerWidth - 240 - 100;
    return (
        <Paper elevation={3}>
          <h3>{title}</h3>
          <AreaChart
            width={pageWidth}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 30,
              bottom: 50,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={dataKey} angle="290" tickFormatter={(value) => value.toString().slice(0,10)} tickMargin="40"/>
            <YAxis tickFormatter={tick => tick.toLocaleString()}/>
            <Tooltip formatter={(value) => value.toString().slice(0,10)}/>
            <Legend iconType="circle" verticalAlign="top"/>
            {barInfo.map(item =>  
                <Area type="monotone" dataKey={item.dataKey} name={item.name} fill={item.fill} />
            )}
          </AreaChart>
          </Paper>
    )
}