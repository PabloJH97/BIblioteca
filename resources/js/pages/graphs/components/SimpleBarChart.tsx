import { useTranslations } from '@/hooks/use-translations';
import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
interface SimpleBarChartProps{
    data: any[];
}


export default function SimpleBarChart({data}: SimpleBarChartProps){
    const { t } = useTranslations();
    function findFloor(value:string):string{
        let returnValue=''
        data.map(zone=>{
            if(value==zone.floorName){
                let floorNameArray=zone.floorName.split(' ')
                returnValue=t(`ui.genres.names.${floorNameArray[0]}`)+' '+floorNameArray[1]+' '+floorNameArray[2]
            }
        }
        )
        return returnValue
    }
    const CustomTooltip = ({ active, payload, label }) => {
        let returnValue
        let labelValue
        if (active && payload && payload.length) {
            data.map(zone=>{
            if(label==zone.floorName){
                let floorNameArray=zone.floorName.split(' ')
                labelValue=t(`ui.genres.names.${floorNameArray[0]}`)+' '+floorNameArray[1]+' '+floorNameArray[2]
            }
        }
        )
            returnValue=(
            <div className="custom-tooltip bg-gray-50/75 border-2 border-black/25 p-2">
                <p className="label">{`${labelValue}`}</p>
                <p className="desc text-[#30bcdb]">{`${payload[0].name} : ${payload[0].value}`}</p>
            </div>
            );
        }

        return returnValue;
    }
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
          <XAxis dataKey={data[0].hasOwnProperty('name')?"name":data[0].hasOwnProperty('title')?"title":"floorName"} tickFormatter={(value)=>(data[0].hasOwnProperty('floor')?findFloor(value):value)}/>
          <YAxis allowDecimals={false}/>
          {data[0].hasOwnProperty('floor')?<Tooltip content={<CustomTooltip/>}/>:<Tooltip/>}
          <Legend />
          {(data[0].hasOwnProperty('genre')&&!data[0].hasOwnProperty('title'))&&<Bar dataKey="totalActionsFront" fill="#30bcdb" activeBar={<Rectangle fill="pink" stroke="blue"/>} name={t(`ui.graphs.totalActions`)}/>}
          {(data[0].hasOwnProperty('name')||data[0].hasOwnProperty('title'))&&<Bar dataKey="loans_count" fill="#82ca9d" activeBar={<Rectangle fill="pink" stroke="blue" />} name={t(`ui.graphs.loansCount`)}/>}
          {(data[0].hasOwnProperty('name')||data[0].hasOwnProperty('title'))&&<Bar dataKey="reservations_count" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} name={t(`ui.graphs.reservationsCount`)}/>}

        </BarChart>
      </ResponsiveContainer>
    );
}
