import React, {useState, useEffect} from 'react';
import useInterval from '@use-it/interval'
import '../../../sass/main.css'
import Title from '../../../components/Title';
import PracticeBox from '../../../components/PracticeBox';
import { useSelector, useDispatch } from 'react-redux';
import { initState, selectProgressPercent, selectAccuracyPercent, selectTypeCount, } from "./sentenceSlice";

function PracticeSentence() {
  const dispatch = useDispatch();
  const progressPecent = useSelector(selectProgressPercent);
  const accuracyPecent = useSelector(selectAccuracyPercent);
  const typeCount = useSelector(selectTypeCount);
  const [tick, setTick] = useState(0); // 시작 후 흐른 시간
  const [typeSpeed, setTypeSpeed] = useState(0);
  const [maxTypeSpeed, setMaxTypeSpeed] = useState(0);
  const [praticeInformation, setPractiveInformation] = useState([]);
  
  useEffect(() => {
    dispatch(initState());
  }, []);
  
  useEffect(() => {
    setPractiveInformation([
      { title: "진행도", figure: progressPecent, id: "noBorder" },
      { title: "현재 타수", figure: typeSpeed },
      { title: "최대 타수", figure: maxTypeSpeed },
      { title: "정확도", figure: accuracyPecent },
    ]);
  }, [tick]);

  useInterval(() => {
    setTypeSpeed(parseInt(typeCount / tick * 60) | 0);
    setMaxTypeSpeed(Math.max(typeSpeed, maxTypeSpeed));
    setTick(tick + 0.1);
  }, 100);

  return (
    <div className="content">
      <Title title="문장연습" />
      <PracticeBox information = {praticeInformation}/>
    </div>
  );
}

export default PracticeSentence;