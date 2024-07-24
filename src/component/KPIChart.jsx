import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

const data = [
  { time: '00:00', sog: 14, stw1: 13.5, stw2: 13.7, veng: 15, minCharteredSpeed: 14.5 },
  { time: '04:00', sog: 14.2, stw1: 13.7, stw2: 13.9, veng: 15.2, minCharteredSpeed: 14.5 },
  { time: '08:00', sog: 14.5, stw1: 14, stw2: 14.2, veng: 15.5, minCharteredSpeed: 14.5 },
  { time: '12:00', sog: 14.3, stw1: 13.8, stw2: 14, veng: 15.3, minCharteredSpeed: 14.5 },
  { time: '16:00', sog: 14.1, stw1: 13.6, stw2: 13.8, veng: 15.1, minCharteredSpeed: 14.5 },
  { time: '20:00', sog: 14.4, stw1: 13.9, stw2: 14.1, veng: 15.4, minCharteredSpeed: 14.5 },
];

const KPIChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis label={{ value: 'Speed (knots)', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sog" stroke="#8884d8" name="SOG" />
        <Line type="monotone" dataKey="stw1" stroke="#82ca9d" name="STW (WRC1)" />
        <Line type="monotone" dataKey="stw2" stroke="#ffc658" name="STW (WRC2)" />
        <Line type="monotone" dataKey="veng" stroke="#ff7300" name="Veng" />
        <ReferenceLine y={14.5} label="Min Chartered Speed" stroke="red" strokeDasharray="3 3" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default KPIChart;