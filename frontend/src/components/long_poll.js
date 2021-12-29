import React from 'react';
import ReactECharts from 'echarts-for-react';


const LongPoll = () => {

    let option = {
      title: {
        text: '长轮询'
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

export default LongPoll;