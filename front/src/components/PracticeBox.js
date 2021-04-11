import React from 'react';
import '../sass/main.css'
import PropTypes from 'prop-types';
import ProgressBox from '../components/ProgressBox';
import PracticeSentenceTask from '../features/practices/sentences/PracticeSentenceTask';


function PracticeBox () {
  return (
    <div className='practice-box'>
      <div className='practice-info'>
        <ProgressBox title = '진행도' figure = {0} id = 'noBorder'/>
        <ProgressBox title = '현재 타수' figure = {0}/>
        <ProgressBox title = '최고 타수' figure = {0}/>
        <ProgressBox title = '정확도' figure = {0}/>
      </div>
      <PracticeSentenceTask/>
    </div>  
  );
}

PracticeBox.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

export default PracticeBox;