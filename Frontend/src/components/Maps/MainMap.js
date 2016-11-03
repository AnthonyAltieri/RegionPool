/**
 * @author Anthony Altieri on 11/2/16.
 */

import React, { Component } from 'react';


const regions = [
  {
    // PB zone
    paths: [
      { lat: 32.806285, lng: -117.242873 },
      { lat: 32.799870, lng: -117.240845 },
      { lat: 32.800956, lng: -117.235297 },
      { lat: 32.807554, lng: -117.237283 },
      { lat: 32.806285, lng: -117.242873 },
    ],
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35
  },
  {
    // Downtown zone
    paths: [
      { lat: 32.719968, lng: -117.169282 },
      { lat: 32.719968, lng: -117.160160 },
      { lat: 32.715707, lng: -117.160160 },
      { lat: 32.715707, lng: -117.169312 },
      { lat: 32.719968, lng: -117.169282 },
    ],
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35
  },
  {
    // La Jolla Zone
    paths: [
      { lat: 32.871555, lng: -117.237863 },
      { lat: 32.868536, lng: -117.238014 },
      { lat: 32.864197, lng: -117.236198 },
      { lat: 32.864960, lng: -117.234268 },
      { lat: 32.865818, lng: -117.233531 },
      { lat: 32.866645, lng: -117.233247 },
      { lat: 32.867519, lng: -117.233323 },
      { lat: 32.868265, lng: -117.228498 },
      { lat: 32.868329, lng: -117.224733 },
      { lat: 32.869568, lng: -117.224582 },
      { lat: 32.870871, lng: -117.223466 },
      { lat: 32.872270, lng: -117.227098 },
      { lat: 32.871555, lng: -117.237863 },
    ],
    strokeColor: '#4CAF50',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#4CAF50',
    fillOpacity: 0.35
  }
]

class MainMap extends Component {
  componentDidMount() {
    const { lat, lng } = this.props;
    var map;
    function initMap() {
      map = new google.maps.Map(document.getElementById('mainMap'), {
        center: { lat, lng },
        zoom: 14,
      });
      new google.maps.Marker({
        position: { lat: 32.867740, lng: -117.233501 },
        map: map
      });
      regions.forEach((r) => {
        new google.maps.Polygon(r).setMap(map);
      })
    }
    initMap();
  }

  render() {
    return (
      <div
        id="mainMap"
        className="container-map"
      >
      </div>
    )
  }
};

export default MainMap;