import React, { useContext } from 'react';
import {KeyboardContext} from './Contexts';
import Kyaru1 from './assets/kyaru1.png';
import Kyaru2 from './assets/kyaru2.png';
import Japan1 from './assets/japan1.jpg';
import Japan2 from './assets/japan2.jpg';
import Japan3 from './assets/japan3.jpg';
import Japan4 from './assets/japan4.jpg';
import Pepe1  from './assets/pepe/1.png';
import Pepe3  from './assets/pepe/3.png';
import Pepe5  from './assets/pepe/5.png';
import Pepe7  from './assets/pepe/7.png';
import Pepe9  from './assets/pepe/9.png';
import Pepe11 from './assets/pepe/11.png';
import Pepe13 from './assets/pepe/13.png';
import Pepe15 from './assets/pepe/15.png';
import Pepe17 from './assets/pepe/17.png';
import Pepe19 from './assets/pepe/19.png';
import Pepe21 from './assets/pepe/21.png';
import Pepe23 from './assets/pepe/23.png';
import Pepe25 from './assets/pepe/25.png';
import Pepe27 from './assets/pepe/27.png';
import Pepe29 from './assets/pepe/29.png';
import Pepe31 from './assets/pepe/31.png';
import Pepe33 from './assets/pepe/33.png';
import Pepe35 from './assets/pepe/35.png';
import Pepe37 from './assets/pepe/37.png';
import Pepe39 from './assets/pepe/39.png';
import Pepe41 from './assets/pepe/41.png';
import Pepe43 from './assets/pepe/43.png';
import Pepe45 from './assets/pepe/45.png';
import Pepe47 from './assets/pepe/47.png';
import Pepe49 from './assets/pepe/49.png';
import Pepe51 from './assets/pepe/51.png';
import Pepe53 from './assets/pepe/53.png';
import Pepe55 from './assets/pepe/55.png';
import Pepe57 from './assets/pepe/57.png';
import Pepe59 from './assets/pepe/59.png';

function KyaruAnime() {
  const keyboard = useContext(KeyboardContext);

  const src = keyboard.typeCount % 2 ? Kyaru2 : Kyaru1;
  return (
    <img className="animation" src={src} height="100"/>
  )
}

const japanImages = [
  Japan1, Japan2, Japan3, Japan4,
]

function JapanAnime() {
  const keyboard = useContext(KeyboardContext);

  const src = japanImages[keyboard.typeCount % 4];

  return (
    <img className="animation" src={src} height="100"/>
  )
}

const pepeImages = [
  Pepe1, Pepe3, Pepe5, Pepe7, Pepe9,
  Pepe11, Pepe13, Pepe15, Pepe17, Pepe19,
  Pepe21, Pepe23, Pepe25, Pepe27, Pepe29,
  Pepe31, Pepe33, Pepe35, Pepe37, Pepe39,
  Pepe41, Pepe43, Pepe45, Pepe47, Pepe49,
  Pepe51, Pepe53, Pepe55, Pepe57, Pepe59,
]

function PepeAnime() {
  const keyboard = useContext(KeyboardContext);

  const src = pepeImages[keyboard.typeCount % 30];
  return (
    <img className="animation" src={src} height="100"/>
  )
}

export {KyaruAnime, JapanAnime, PepeAnime};
