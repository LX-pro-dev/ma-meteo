import React from 'react'
import "./weather.style.css";

const Wind = (props) => {
  return (
    <div className="container text-light">
      <div className="cards pt-4">
        {props.wind_speed ? <i className="wi-strong-wind display-1" /> : null}
        {props.wind_speed ? wind(props.wind_direction,props.wind_speed): null}
      </div> 
    </div>
  )
}

const windDirection = (k) => {
    
  if (k>=(338 && k < 360) || (k >= 0 && k<23))  return "wi-direction-up";
  else if (k>=23 && k<68)                       return "wi-direction-up-righ";
  else if(k>=68 && k<113)                       return 'wi-direction-right';
  else if (k>= 113 && k < 158)                  return "wi-direction-down-right";
  else if (k>= 158 && k < 203)                  return "wi-direction-down";
  else if (k>= 203 && k < 248)                  return "wi-direction-down-left";
  else if (k>= 248 && k < 293)                  return "wi-direction-left";
  else if (k>= 293 && k < 338)                  return "wi-direction-up-left";
}

const windSpeed = (k) => {
  return (k * 3.6).toFixed(0)
}

function wind(direction, speed) {
  console.log(direction, speed);
  if (speed!== undefined && direction!== undefined) {
    return (
      <h4 className="py-3">
      <i className= {windDirection(direction)} /> 
      <strong>{windSpeed(speed)} km/h</strong> 
    </h4>
    );
  }
}

export default Wind