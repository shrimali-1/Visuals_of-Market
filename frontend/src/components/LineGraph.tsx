import React from "react"
import { Line } from 'react-chartjs-2';
import { LinearScale, CategoryScale, TimeScale, PointElement, LineElement, Chart, TimeSeriesScale } from "chart.js";

interface LineGraphPoint {
    x: String,
    y: Number,
}

interface LineGraphProps {
    graphData: LineGraphPoint[];
}

const LineGraph: React.FC<LineGraphProps> = ({ graphData }) => {
    Chart.register(CategoryScale);
    Chart.register(LinearScale);
    Chart.register(PointElement);
    Chart.register(LineElement);
    Chart.register(TimeScale);
    // Chart.register(Point);
    const data = {
        datasets: [
            {
                label: 'Line Graph',
                data: graphData,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                adapters: {
                    type: "time",
                    time: {
                        parser: "yyyy-MM-dd",
                    unit: "month"
                },
                title: {
                    display: true,
                    text: "Date"
                }
            }
        },
        y: {
            beginAtZero: true,
        },
    },
};
return (
    <div style={{ width: '75%'}}>
        <h4>True Beacon</h4>
        <Line data={data} />
    </div>
)
}

export default LineGraph