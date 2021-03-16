import React from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis } from 'recharts';

function TypingSpeedGraph({ num, list }) {
  return (
    <div>
      <h3>{num}</h3>
      <LineChart
        width={1000}
        height={200}
        data={list}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="x" />
        <YAxis />
        <Line type="monotone" dataKey="speed" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  )
}

TypingSpeedGraph.propTypes = {
  num: PropTypes.number,
  list: PropTypes.array,
};

export default TypingSpeedGraph;