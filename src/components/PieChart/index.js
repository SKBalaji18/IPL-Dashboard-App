import {
  PieChart as PieChartComponent,
  Pie,
  Legend,
  Cell,
  Tooltip,
} from 'recharts'
import './index.css'

const PieChart = props => {
  const {data} = props
  console.log(data)
  const COLORS = ['#18ed66', '#e31a1a', '#FF8042']

  return (
    <div className="pie-chart-bg-container">
      <PieChartComponent width={400} height={350}>
        <Pie
          data={data}
          innerRadius={0}
          outerRadius={100}
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell
              name={entry.name}
              key={`cell-${entry.name}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
      </PieChartComponent>
    </div>
  )
}

export default PieChart
