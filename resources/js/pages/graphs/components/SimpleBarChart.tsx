import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
interface SimpleBarChartProps{
    data: any[];
}


export default function SimpleBarChart({data}: SimpleBarChartProps){
    console.log(data.hasOwnProperty('name'), data)
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={data[0].hasOwnProperty('name')?"name":"title"} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="loans_count" fill="#82ca9d" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="reservations_count" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>
    );
}
