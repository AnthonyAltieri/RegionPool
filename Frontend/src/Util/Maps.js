/**
 * @author Anthony Altieri on 11/9/16.
 */

export const isWithinPolygon = (polygon, lat, lng) => (
  google.maps.geometry.poly.containsLocation(
    new google.maps.LatLng({ lat, lng }),
    polygon
  )
);

export const handleLocationWithPolygons = (polygons, lat, lng) => {
  polygons.forEach((p) => {
    if (isWithinPolygon(p, lat, lng)) {
      p.setOptions({
        strokeColor: '#4CAF50',
        fillColor: '#4CAF50',
      })
    } else {
      p.setOptions({
        strokeColor: '#FF0000',
        fillColor: '#FF0000',
      });
    }
  })
}
