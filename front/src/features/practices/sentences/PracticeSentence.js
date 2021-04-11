import React from 'react';
import '../../../sass/main.css'
import Title from '../../../components/Title';
import PracticeBox from '../../../components/PracticeBox';

function PracticeSentence() {
  return (
    <div className='content'>
      <Title title = '문장연습'/>
      <PracticeBox/>
    </div>
  );
}

export default PracticeSentence;