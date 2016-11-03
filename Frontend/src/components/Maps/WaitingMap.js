/**
 * @author Anthony Altieri on 11/2/16.
 */

import React, { Component } from 'react';


class WaitingMap extends Component {
  componentDidMount() {
    // const { current, car } = this.props;
    var map;
    function initMap() {
      map = new google.maps.Map(document.getElementById('waitingMap'), {
        center: { lat: 32.867740, lng: -117.233501 },
        zoom: 14,
      });

      const carIconProduction = 'http://35.161.34.206/static/img/car.png';
      const carIconDevelopment = 'http://localhost:4040/static/img/car.png';


      // Your location
      new google.maps.Marker({
        position: { lat: 32.867740, lng: -117.233501 },
        map,
      });
      // Car marker
      new google.maps.Marker({
        position: { lat: 32.865047, lng: -117.234216 },
        icon: carIconDevelopment,
        map,
      });
    }
    initMap();
  }

  render() {
    const { style } = this.props;
    return (
      <div
        id="waitingMap"
        style={{
          width: "100%",
          height: "300px",
        }}
      >
      </div>
    )
  }
};

export default WaitingMap;
