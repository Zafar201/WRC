import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { format, parseISO } from 'date-fns';

const beaufortScale = {
  0: [0, 1], 1: [1, 3], 2: [4, 6], 3: [7, 10], 4: [11, 16], 5: [17, 21],
  6: [22, 27], 7: [28, 33], 8: [34, 40], 9: [41, 47], 10: [48, 55],
  11: [56, 63], 12: [64, Infinity]
};

// eslint-disable-next-line react/prop-types
const WindSpeedAnalysisChart = ({ data }) => {
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
      const windSpeed = parseFloat(payload[0].value);
      const beaufortForce = getBeaufortForce(windSpeed);
      return (
        <div className="custom-tooltip" style={{ backgroundColor: 'white', padding: '5px', border: '1px solid #ccc' }}>
          <p>{`Time: ${format(parseISO(label), 'MMM dd HH:mm')}`}</p>
          <p>{`Wind Speed: ${windSpeed} knots`}</p>
          <p>{`Beaufort Force: ${beaufortForce}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="DateTime" tickFormatter={formatXAxis} />
        <YAxis label={{ value: 'Wind Speed (knots)', angle: -90, position: 'insideLeft' }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line type="monotone" dataKey="WindSpd" stroke="#8884d8" name="Wind Speed" dot={false} />
        {Object.entries(beaufortScale).map(([force, [min, max]]) => (
          <ReferenceLine
            key={force}
            y={min}
            stroke="red"
            strokeDasharray="3 3"
            label={{ value: `BF ${force}`, position: 'right' }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WindSpeedAnalysisChart;