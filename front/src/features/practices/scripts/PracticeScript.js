import React, {useState, useEffect} from 'react';
import useInterval from '@use-it/interval'
import '../../../sass/main.css'
import Title from '../../../components/Title';
import PracticeBox from '../../../components/PracticeBox';
import { useSelector, useDispatch } from 'react-redux';
import { initState, selectProgressPercent, selectTypeCount, updateTypeSpeed, selectTitle} from "./scriptSlice";

function PracticeScript() {
  const dispatch = useDispatch();
  const progressPecent = useSelector(selectProgressPercent);
  const typeCount = useSelector(selectTypeCount);
  const [tick, setTick] = useState(0); // 시작 후 흐른 시간
  const [typeSpeed, setTypeSpeed] = useState(0);
  const [maxTypeSpeed, setMaxTypeSpeed] = useState(0);
  const [praticeInformation, setPractiveInformation] = useState([]);
  const title = useSelector(selectTitle);

  useEffect(() => {
    dispatch(initState());
  }, []);
  
  useEffect(() => {
    setPractiveInformation([
      { title: "진행도", figure: progressPecent, id: "noBorder" },
      { title: "현재 타수", figure: typeSpeed },
      { title: "최대 타수", figure: maxTypeSpeed },
      { title: "스크립트명", figure: title },
    ]);
  }, [tick]);

  useInterval(() => {
    setTypeSpeed(parseInt(typeCount / tick * 60) | 0);
    setMaxTypeSpeed(Math.max(typeSpeed, maxTypeSpeed));
    setTick(tick + 0.1);
    dispatch(updateTypeSpeed(typeSpeed));
  }, 100);

  return (
    <div className="content">
      <Title title="스크립트 연습" />
      <PracticeBox type = "script" information = {praticeInformation}/>
    </div>
  );
}

export default PracticeScript;