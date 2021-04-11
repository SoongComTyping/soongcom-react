import React from 'react';
import Sentence from './Sentence';

function PracticeSentenceTask () {
  const tempData = ['숭실대학교 컴퓨터학부가 생겨났다.',
    '모든게 여전한 나라에서, 다른 느낌을 받는다.', '아이즈원의 노래는 잘 맞추는 사람이 있다.', 
    '여러 곳을 들려 선물을 준비한 보람이 있다.', '토파즈 보석을 캤던 곳에서 다이아몬드를 주울 확률은 얼마나 될지 모르겠다'];
  const currentResult = '소 가는데 말도 간다.';
  const finishedInput = currentResult;
  const finishedResult = currentResult;
  const currentInput = currentResult;

  const sentences = tempData.map((item, index) =>
    <Sentence sentence={item} key = {index}/>);

  return (
    <div className="sentence-task">
      <Sentence type = 'finished-result' sentence = {finishedResult}/>
      <Sentence type = 'finished-input' sentence = {finishedInput}/>
      <Sentence type = 'current-result' sentence = {currentResult}/>
      <Sentence type = 'current-input' sentence = {currentInput}/>
      {sentences}
    </div>
  );
}

export default PracticeSentenceTask;