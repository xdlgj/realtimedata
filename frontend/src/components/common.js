import React, {useState, useEffect} from 'react';
import ReactECharts from 'echarts-for-react';
import axios from 'axios';


const Common = () => {
    const [option, setOption] = useState({});
    useEffect(() => {
        console.log(option)
    }, []);

    let option1 = {
      title: {
        text: '传统方法'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['09:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00', '15:00:00']
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    };

    return (
        <ReactECharts
            option={option}
        />
    )
}

export default Common;