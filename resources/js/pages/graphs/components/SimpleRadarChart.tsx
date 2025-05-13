import { useTranslations } from '@/hooks/use-translations';
import React, { PureComponent } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface SimpleRadarChartProps {
    data: any[];
}

export default function SimpleRadarChart({data}:SimpleRadarChartProps) {
    const { t } = useTranslations();
    return (
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            {console.log(data)}
          <PolarGrid />
          <PolarAngleAxis dataKey='zone.genre.totalActions' tickFormatter={(value)=> t(`ui.genres.names.${value}`)}/>
          <PolarRadiusAxis />
          <Radar name="totalActions" dataKey='zone.genre.totalActions' stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    );
}
