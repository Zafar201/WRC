
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

const data = [
  { time: '00:00', shipSigWaveHeight: 2.5, wrcSigWaveHeight: 2.3, shipWindWaveHeight: 1.5, wrcWindWaveHeight: 1.4, shipSwellWaveHeight: 2.0, wrcSwellWaveHeight: 1.9, shipWindSpeed: 15, wrcWindSpeed: 14 },
  { time: '04:00', shipSigWaveHeight: 2.7, wrcSigWaveHeight: 2.4, shipWindWaveHeight: 1.6, wrcWindWaveHeight: 1.5, shipSwellWaveHeight: 2.1, wrcSwellWaveHeight: 2.0, shipWindSpeed: 16, wrcWindSpeed: 15 },
  { time: '08:00', shipSigWaveHeight: 3.0, wrcSigWaveHeight: 2.6, shipWindWaveHeight: 1.8, wrcWindWaveHeight: 1.6, shipSwellWaveHeight: 2.3, wrcSwellWaveHeight: 2.1, shipWindSpeed: 18, wrcWindSpeed: 17 },
  { time: '12:00', shipSigWaveHeight: 3.2, wrcSigWaveHeight: 2.8, shipWindWaveHeight: 1.9, wrcWindWaveHeight: 1.7, shipSwellWaveHeight: 2.5, wrcSwellWaveHeight: 2.2, shipWindSpeed: 20, wrcWindSpeed: 18 },
  { time: '16:00', shipSigWaveHeight: 3.5, wrcSigWaveHeight: 3.0, shipWindWaveHeight: 2.1, wrcWindWaveHeight: 1.8, shipSwellWaveHeight: 2.7, wrcSwellWaveHeight: 2.4, shipWindSpeed: 22, wrcWindSpeed: 20 },
  { time: '20:00', shipSigWaveHeight: 3.3, wrcSigWaveHeight: 2.9, shipWindWaveHeight: 2.0, wrcWindWaveHeight: 1.7, shipSwellWaveHeight: 2.6, wrcSwellWaveHeight: 2.3, shipWindSpeed: 21, wrcWindSpeed: 19 },
];

const beaufortForces = [
  { force: 0, speed: 1 },
  { force: 1, speed: 3 },
  { force: 2, speed: 6 },
  { force: 3, speed: 10 },
  { force: 4, speed: 16 },
  { force: 5, speed: 21 },
  { force: 6, speed: 27 },
  { force: 7, speed: 33 },
  { force: 8, speed: 40 },
  { force: 9, speed: 47 },
  { force: 10, speed: 55 },
];



const VerificationChart = () => {

  return (
    <ResponsiveContainer width="100%" height={600}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis yAxisId="wave" label={{ value: 'Wave Height (m)', angle: -90, position: 'insideLeft' }} />
        <YAxis yAxisId="wind" orientation="right" label={{ value: 'Wind Speed (knots)', angle: 90, position: 'insideRight' }} />
        <Tooltip />
        <Legend />
        <Line yAxisId="wave" type="monotone" dataKey="shipSigWaveHeight" stroke="#8884d8" name="Ship Sig. Wave Height" />
        <Line yAxisId="wave" type="monotone" dataKey="wrcSigWaveHeight" stroke="#82ca9d" name="WRC Sig. Wave Height" />
        <Line yAxisId="wave" type="monotone" dataKey="shipWindWaveHeight" stroke="#ffc658" name="Ship Wind Wave Height" />
        <Line yAxisId="wave" type="monotone" dataKey="wrcWindWaveHeight" stroke="#ff7300" name="WRC Wind Wave Height" />
        <Line yAxisId="wave" type="monotone" dataKey="shipSwellWaveHeight" stroke="#a4de6c" name="Ship Swell Wave Height" />
        <Line yAxisId="wave" type="monotone" dataKey="wrcSwellWaveHeight" stroke="#d0ed57" name="WRC Swell Wave Height" />
        <Line yAxisId="wind" type="monotone" dataKey="shipWindSpeed" stroke="#8dd1e1" name="Ship Wind Speed" />
        <Line yAxisId="wind" type="monotone" dataKey="wrcWindSpeed" stroke="#83a6ed" name="WRC Wind Speed" />
        {beaufortForces.map((force) => (
          <ReferenceLine 
            key={force.force} 
            y={force.speed} 
            yAxisId="wind" 
            label={`Beaufort ${force.force}`} 
            stroke="red" 
            strokeDasharray="3 3" 
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default VerificationChart;