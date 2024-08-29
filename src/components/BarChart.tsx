import {
  BarChart as ChartBar,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const BarChart = ({data}: any) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <ChartBar data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray='3 3 ' />
        <XAxis dataKey='date' />
        <YAxis />
        <Tooltip />
        <Bar dataKey='count' fill='#3b82f6' barSize={75} />
      </ChartBar>
    </ResponsiveContainer>
  )
}
export default BarChart