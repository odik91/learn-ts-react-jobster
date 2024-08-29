import {
  Area,
  CartesianGrid,
  AreaChart as ChartArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const AreaChart = ({ data }: any) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ChartArea
        data={data}
        margin={{
          top: 50,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis  />
        <Tooltip />
        <Area type='monotone' dataKey='count' stroke='#1e3a8a' fill='#3b82f6' />
      </ChartArea>
    </ResponsiveContainer>
  );
};
export default AreaChart;
