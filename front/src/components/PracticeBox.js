import React from 'react';
import '../sass/main.css'
import PropTypes from 'prop-types';
import ProgressBox from '../components/ProgressBox';
import PracticeSentenceTask from '../features/practices/sentences/PracticeSentenceTask';
import PracticeScriptTask from '../features/practices/scripts/PracticeScriptTask';

function PracticeBox({type, information}) {
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
      {type == "sentence" && <PracticeSentenceTask />}
      {type == "script" && <PracticeScriptTask />}
    </div>
  );
}

PracticeBox.propTypes = {
  type: PropTypes.string,
  information: PropTypes.array,
};

export default PracticeBox;