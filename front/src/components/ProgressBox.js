import React from 'react';
import '../sass/main.css'
import PropTypes from 'prop-types';
import ProgressBar from "@ramonak/react-progress-bar";

function ProgressBox ({title, figure, id}) {
  var progressPercent = String(figure).replace("%", '');
  if (title == "스크립트명")
    return (
      <div className="progress-box" id={id}>
        <div className="left-content">
          <div className="title">{title}</div>
          <div className="text-box">
            <div className="name">{figure}</div>
          </div>
        </div>
      </div>
    );
  else
    return (
      <div className="progress-box" id={id}>
        <div className="left-content">
          <div className="title">{title}</div>
          <div className="progress-border">
            <ProgressBar
              completed={progressPercent}
              bgColor="#7BC5C5"
              baseBgColor="#FFFFFF"
              borderRadius="2px"
              isLabelVisible={false}
            />
          </div>
        </div>
        <div className="figure">{figure}</div>
      </div>
    );
}

ProgressBox.propTypes = {
  title: PropTypes.string,
  figure: PropTypes.any,
  id: PropTypes.string,
};

export default ProgressBox;