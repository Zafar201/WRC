import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

const generateCurveData = (a, b, minSpeed, maxSpeed) => {
  const data = [];
  for (let speed = minSpeed; speed <= maxSpeed; speed += 0.1) {
    data.push({
      speed: speed,
      consumption: a * Math.pow(speed, 3) + b
    });
  }
  return data;
};

const warrantedData = generateCurveData(0.0001, 10, 10, 20);
const warrantedWithAboutData = generateCurveData(0.0001, 15, 10, 20);
const achievedData = generateCurveData(0.00012, 12, 10, 20);

const CubeRuleChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" dataKey="speed" name="Speed">
          <Label value="Speed (knots)" offset={0} position="insideBottom" />
        </XAxis>
        <YAxis type="number" dataKey="consumption" name="Consumption">
          <Label value="Consumption (tons/day)" angle={-90} position="insideLeft" />
        </YAxis>
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        <Scatter name="Warranted" data={warrantedData} fill="#8884d8" line shape="circle" />
        <Scatter name="Warranted with about" data={warrantedWithAboutData} fill="#82ca9d" line shape="circle" />
        <Scatter name="Achieved" data={achievedData} fill="#ffc658" line shape="circle" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default CubeRuleChart;