import { DatePicker } from "antd";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useGetChartQuery } from "../redux/features/dashboard/dashboardApi";

const BarChartIncomeRatio = () => {
  const [year, setYear] = useState('2024');
  const [chartData, setChartData] = useState([]);
  const { data, isError, error } = useGetChartQuery(year);

  const onChange = (date, dateString) => {
    setYear(dateString);
  };

  const generateEmptyChart = (year) => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return months.map(month => ({ month: `${month} ${year}`, earnings: 0 }));
  };

  useEffect(() => {
    if (isError && error) {
      setChartData([]);
    } else if (data) {
      setChartData(data?.data?.attributes);
    } else {
      setChartData(generateEmptyChart(year));
    }
  }, [data, isError, error, year]);

  return (
    <div className="bg-primary w-full h-[318px] mt-5 rounded-xl border-2 shadow-xl">
      <div className="flex justify-between p-[16px]">
        <div>
          <h1 className="text-[20px] font-medium">Earnings</h1>
        </div>
        <div className="bg-primary">
          <DatePicker
            className="custom-date-picker"
            onChange={onChange}
            picker="year"
            suffixIcon
          />
        </div>
      </div>
      <div>
        <BarChart
          width={1500}
          height={250}
          data={chartData.length > 0 ? chartData : generateEmptyChart(year)}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="black" />
          <XAxis dataKey="month" tick={{ stroke: "black", strokeWidth: 0.5 }} />
          <YAxis tick={{ stroke: "black", strokeWidth: 0.5 }} />
          <Bar
            dataKey="earnings"
            fill="#95C343"
            barSize={36}
          />
        </BarChart>
      </div>
    </div>
  );
};

export default BarChartIncomeRatio;
