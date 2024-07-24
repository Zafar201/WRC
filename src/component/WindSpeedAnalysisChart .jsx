/* eslint-disable react/prop-types */
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';

const beaufortScale = {
  0: [0, 1], 1: [1, 3], 2: [4, 6], 3: [7, 10], 4: [11, 16], 5: [17, 21],
  6: [22, 27], 7: [28, 33], 8: [34, 40], 9: [41, 47], 10: [48, 55],
  11: [56, 63], 12: [64, Infinity]
};

const WindSpeedAnalysisChart = ({ data }) => {
  const processedData = data.map(item => ({
    DateTime: item.DateTime,
    ShipWind: item['Wind\r\n(BF)'] !== null ? parseFloat(item['Wind\r\n(BF)']) : null,
    WRCWind: item.WindSpd !== null ? parseFloat(item.WindSpd) : null
  }));

  const formatXAxis = (tickItem) => {
    return format(parseISO(tickItem), 'MMM dd HH:mm');
  };

  const getBeaufortForce = (windSpeed) => {
    for (const [force, range] of Object.entries(beaufortScale)) {
      if (windSpeed >= range[0] && windSpeed < range[1]) {
        return parseInt(force);
      }
    }
    return null;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ backgroundColor: 'white', padding: '5px', border: '1px solid #ccc' }}>
          <p>{`Time: ${format(parseISO(label), 'MMM dd HH:mm')}`}</p>
          {payload.map((entry) => {
            if (entry.value !== null) {
              const beaufortForce = getBeaufortForce(entry.value);
              return (
                <p key={entry.dataKey}>
                  {`${entry.name}: ${entry.value.toFixed(2)} knots (BF ${beaufortForce})`}
                </p>
              );
            }
            return null;
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={processedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="DateTime" tickFormatter={formatXAxis} />
        <YAxis label={{ value: 'Wind Speed (knots)', angle: -90, position: 'insideLeft' }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line type="monotone" dataKey="ShipWind" stroke="#8884d8" name="Ship Wind" connectNulls={true} />
        <Line type="monotone" dataKey="WRCWind" stroke="#82ca9d" name="WRC Wind" connectNulls={true} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WindSpeedAnalysisChart;