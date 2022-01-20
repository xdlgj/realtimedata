import React, {useState, useEffect} from 'react';
import ReactECharts from 'echarts-for-react';
import axios from 'axios';


const SSE = () => {
    const [times, setTimes] = useState([]);
    const [temp, setTemp] = useState([]);
    const t = [];
    const v = [];

    useEffect(() => {
        const evtSource = new EventSource('http://127.0.0.1:8000/temp/sse/');
        console.log(evtSource)
        evtSource.onopen = function() {
            console.log("Connection to server opened.");
        };
        evtSource.onmessage = (e) => {
            const data = JSON.parse(e.data);
            console.log(data)
            data.data.forEach(ele => {
                t.push(ele.time.slice(0, 8));
                v.push(ele.value);
            })

            setTimes([...t]);
            setTemp([...v]);
        };
        return () => {
            evtSource && evtSource.close()
        }
    }, []);

    let option = {
      title: {
        text: 'SSE'
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

export default SSE;