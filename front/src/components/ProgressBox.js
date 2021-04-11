import React from 'react';
import '../sass/main.css'
import PropTypes from 'prop-types';
import ProgressBar from "@ramonak/react-progress-bar";

function ProgressBox ({title, figure, id}) {  
  return (    
    <div className='progress-box' id = {id}>
      <div className='left-content'>
        <div className='title'>{title}</div>
        <div className='progress-border'>
          <ProgressBar 
            completed={60}
            bgColor='#7BC5C5'
            baseBgColor='#FFFFFF'
            borderRadius={2}
            isLabelVisible={false}/>
        </div>
      </div>
      <div className='figure'>{figure}</div>
    </div>  
  );
}

ProgressBox.propTypes = {
  title: PropTypes.string,
  figure: PropTypes.number,
  id: PropTypes.string,
};

export default ProgressBox;