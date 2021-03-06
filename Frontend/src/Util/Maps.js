/**
 * @author Anthony Altieri on 11/9/16.
 */

export const isWithinPolygon = (polygon, lat, lng) => (
  google.maps.geometry.poly.containsLocation(
    new google.maps.LatLng({ lat, lng }),
    polygon
  )
);

export const handleLocationWithPolygons = (polyObj, lat, lng) => {
  return new Promise((resolve, reject) => {
    let isInPickupZone = false;
    const keys = Object.keys(polyObj);
    keys.forEach((k) => {
      if (isWithinPolygon(polyObj[k], lat, lng)) {
        isInPickupZone = true;
        polyObj[k].setOptions({
          strokeColor: '#4CAF50',
          fillColor: '#4CAF50',
        });
        resolve(polyObj[k].name)
      } else {
        polyObj[k].setOptions({
          strokeColor: '#FF0000',
          fillColor: '#FF0000',
        });
      }
    });
    resolve(null);
  });
}
