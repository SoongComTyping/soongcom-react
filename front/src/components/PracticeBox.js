import React from 'react';
import '../sass/main.css'
import PropTypes from 'prop-types';
import ProgressBox from '../components/ProgressBox';
import PracticeSentenceTask from '../features/practices/sentences/PracticeSentenceTask';

function PracticeBox({information}) {
  const boxes = information.map((item, index) => (
    <ProgressBox
      key={index}
      title={item.title}
      figure={item.figure}
      id={item.id}
    />
  ));
  return (
    <div className="practice-box">
      <div className="practice-info">{boxes}</div>
      <PracticeSentenceTask />
    </div>
  );
}

PracticeBox.propTypes = {
  information: PropTypes.array,
};

export default PracticeBox;