import { Chart as ChartJS } from 'chart.js/auto'
import { Chart,Pie }            from 'react-chartjs-2'
import { generateColorScale } from '../../constants/helper';
export default function PieChart({ ageGroup,title,d="type" }) {

    const data = {
        labels: ageGroup.map(o => o[d]),
        datasets: [
            {
                data: ageGroup.map(o => o.count),
                backgroundColor: generateColorScale(ageGroup),
                hoverBackgroundColor: generateColorScale(ageGroup),
            }
        ]

    };


    const options={
        responsive: true,
        maintainAspectRatio: false,
        elements: {
            arc: {
              radius: "100"
            }
          }
    }



    return (
        <div>
            <h2>{title}</h2>
            <div style={{height:"200px;"}}>
                <Pie data={data}    options={options}/>
            </div>
        </div>
    );

}

