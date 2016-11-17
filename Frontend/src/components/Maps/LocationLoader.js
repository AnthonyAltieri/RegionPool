/**
 * @author Anthony Altieri on 11/16/16.
 */

import React from 'react';

const middleStyle = {
  position: "absolute",
  top: "45%",
  bottom: "0",
  right: "0",
  left: "0",
  zIndex: "100",
}

const LocationLoader = ({
  isVisible
}) => {
  return isVisible
    ? (
    <div
    >
      <h1
        style={{
          ...middleStyle,
          fontSize: "2.2em",
          width: "100%",
          textAlign: "center",
          top: "25%"
        }}
      >
        Loading Current Location
      </h1>
      <div
        className="sk-wandering-cubes"
        style={{
          ...middleStyle,
          transform: "scale(3)"
        }}
      >
        <div className="sk-cube sk-cube1"></div>
        <div className="sk-cube sk-cube2"></div>
      </div>

    </div>)
    : null
};

export default LocationLoader;