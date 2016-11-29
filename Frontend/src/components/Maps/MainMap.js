/**
 * @author Anthony Altieri on 11/2/16.
 */

import React, { Component } from 'react';
import { handleLocationWithPolygons } from '../../Util/Maps';


const regions = [
  {
    name: 'pacific beach',
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
    name: 'san diego',
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
    name: 'la jolla',
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
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35
  }
];

const handleCurrentLocation = (
  map,
  marker,
  polyObj,
  setLocationStatus,
  setCurrentZone,
  stopLoading
) => {
  const IS_IN_PICKUP_ZONE = true;
  const NOT_IN_PICKUP_ZONE = false;
  console.log('handleCUrrentLocation')
  navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    if (!marker) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map,
      });
      marker.setPosition(new google.maps.LatLng(lat || 32.871810, lng || -117.234912));
      map.panTo(new google.maps.LatLng(lat , lng));
    } else {
      marker.setPosition(new google.maps.LatLng(lat || 32.871810, lng || -117.234912));
    }
    handleLocationWithPolygons(polyObj, lat, lng)
      .then((zoneName) => {
        if (!!zoneName) {
          setLocationStatus(IS_IN_PICKUP_ZONE);
          setCurrentZone(zoneName);
        } else {
          setLocationStatus(NOT_IN_PICKUP_ZONE)
        }
    })
    return marker;
  });
};

const ONE_SECOND = 1000;
const LONG_TIME = 50000;

class MainMap extends Component {
  componentDidMount() {
    const {
      setCurrentLocationInterval,
      setLocationStatus,
      setCurrentZone,
      stopLoading,
    } = this.props;
    var map;
    var currentLocMarker;
    function initMap() {
      map = new google.maps.Map(document.getElementById('mainMap'), {
        center: new google.maps.LatLng(32.871810, -117.234912),
        zoom: 14,
      });
      let polyObj = {};
      let polygons = [];
      regions.forEach((r) => {
        const polygon = new google.maps.Polygon(r);
        polyObj[r.name] = polygon;
        polygons = [...polygons, polygon];
        polygon.setMap(map);
      });
      const marker = handleCurrentLocation(
          map,
          null, // marker
          polyObj,
          setLocationStatus,
          setCurrentZone,
          stopLoading,
        );
      const currentLocationInterval = window.setInterval(() => {
        handleCurrentLocation(
          map,
          marker,
          polyObj,
          setLocationStatus,
          setCurrentZone,
          stopLoading,
        )
        }, ONE_SECOND);
      setCurrentLocationInterval(currentLocationInterval);
    }
    initMap();
  }

  componentWillUnmount() {
    clearInterval(this.props.currentLocationInterval);
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
