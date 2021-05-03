import React from 'react';
import '../../../sass/main.css'
import Title from '../../../components/Title';
import PracticeBox from '../../../components/PracticeBox';
import { useSelector } from 'react-redux';
import { selectProgressPercent, selectAccuracyPercent } from "./sentenceSlice";

function PracticeSentence() {
  const progressPecent = useSelector(selectProgressPercent);
  const accuracyPecent = useSelector(selectAccuracyPercent);

  const praticeInformation = [
    { title: "진행도", figure: progressPecent, id: "noBorder" },
    { title: "현재 타수", figure: 0 },
    { title: "최대 타수", figure: 0 },
    { title: "정확도", figure: accuracyPecent },
  ];

  return (
    <div className="content">
      <Title title="문장연습" />
      <PracticeBox information = {praticeInformation}/>
    </div>
  );
}

export default PracticeSentence;