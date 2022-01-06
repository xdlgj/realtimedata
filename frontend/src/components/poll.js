import React, {useState, useEffect} from 'react';
import ReactECharts from 'echarts-for-react';
import axios from 'axios';


const Poll = () => {
    const [times, setTimes] = useState([]);
    const [temp, setTemp] = useState([]);

    const t = [];
    const v = [];
    let end_time;

    const getData = () => {
        axios.get('temp/poll/', {params: {start_time: end_time}}).then((response) => {
            response.data.data.forEach(ele => {
                t.push(ele.time.slice(0, 8));
                v.push(ele.value);
                end_time = ele.time;
            });
            if (t.length !== 0) {
                setTimes([...t]);
                setTemp([...v]);
            }
        })
    }

    useEffect(() => {
        getData();
        const interval = setInterval(getData,5000)
        return () => {
            clearInterval(interval);
        }
    }, []);

    let option = {
      title: {
        text: '轮询'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: times,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: temp,
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

export default Poll;