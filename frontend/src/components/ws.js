import React, {useState, useEffect} from 'react';
import ReactECharts from 'echarts-for-react';
import axios from 'axios';


const MyWebSocket = () => {
    const [times, setTimes] = useState([]);
    const [temp, setTemp] = useState([]);
    const t = [];
    const v = [];

    useEffect(() => {
        const socket = new WebSocket('ws://127.0.0.1:8000/ws/temp/1/');
        socket.onopen = e => {
            console.log("onopen", e);
        }
        socket.onmessage = e => {
            const data = JSON.parse(e.data);
            data.data.forEach(ele => {
                t.push(ele.time.slice(0, 8));
                v.push(ele.value);
            })

            setTimes([...t]);
            setTemp([...v]);
        };
        return () => {
            socket && socket.close()
        }
    }, []);

    let option = {
      title: {
        text: 'WebSocket'
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

export default MyWebSocket;