import React, {useState, useEffect} from 'react';
import ReactECharts from 'echarts-for-react';
import axios from 'axios';


const Common = () => {
    const [times, setTimes] = useState([]);
    const [temp, setTemp] = useState([]);

    const getData = () => {
        const t = []
        const v = []
        axios.get('/temp/common/').then((response) => {
            response.data.data.forEach(ele => {
                t.push(ele['time'].slice(0, 8));
                v.push(ele['value']);
            })
            setTimes(t);
            setTemp(v);
        })
    }

    useEffect(() => {
        getData();
        const interval = setInterval(getData,2000)
        return () => {
            clearInterval(interval);
        }
    }, []);

    let option = {
      title: {
        text: '传统方法'
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

export default Common;