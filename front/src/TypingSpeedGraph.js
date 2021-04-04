import React from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis } from 'recharts';

function TypingSpeedGraph({ num, list }) {
  return (
    <div>
      <h3>{num}</h3>
      <LineChart
        width={500}
        height={100}
        data={list}
      >
        <XAxis dataKey="x" />
        <YAxis />
        <Line type="monotone" dataKey="speed" stroke="#47A5C7" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  )
}

TypingSpeedGraph.propTypes = {
  num: PropTypes.number,
  list: PropTypes.array,
};

export default TypingSpeedGraph;
