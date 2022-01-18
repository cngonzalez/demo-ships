/* eslint-disable react/jsx-no-bind */
import PropTypes from 'prop-types'
import React, {useMemo, useState, useEffect} from 'react'
import GoogleMapReact from 'google-map-react'
import config from 'config:@sanity/google-maps-input'

import Marker from './Marker'

// Return map bounds based on list of places
const getMapBounds = (map, maps, places) => {
  const bounds = new maps.LatLngBounds()

  places.forEach((place) => {
    bounds.extend(new maps.LatLng(place.lat, place.lng))
  })
  return bounds
}

const apiIsLoaded = (map, maps, places) => {
  // Filter places to just the lat+lng keys, otherwise errors!
  const placesLatLngOnly = places.map(({lat, lng}) => ({lat, lng}))
  const bounds = getMapBounds(map, maps, placesLatLngOnly)
  map.fitBounds(bounds)
  bindResizeListener(map, maps, bounds)
}

// Re-center map when resizing the window
const bindResizeListener = (map, maps, bounds) => {
  maps.event.addDomListenerOnce(map, 'idle', () => {
    maps.event.addDomListener(window, 'resize', () => {
      map.fitBounds(bounds)
    })
  })
}

export default function Map({center, zoom, mapPoints}) {
  const [apiLoaded, setApiLoaded] = useState(null)
  const validPoints = mapPoints.filter(
    (point) => typeof point?.lat === 'number' && typeof point?.lng === 'number'
  )

  // Re-run bounds resize when mapPoints change
  useEffect(() => {
    if (apiLoaded) {
      const {map, maps} = apiLoaded
      apiIsLoaded(map, maps, validPoints)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{height: '100%', width: '100%'}}>
      <GoogleMapReact
        bootstrapURLKeys={{key: config.apiKey}}
        defaultCenter={center}
        defaultZoom={zoom}
        yesIWantToUseGoogleMapReactApiInternals
        onGoogleApiLoaded={(loaded) => {
          setApiLoaded(loaded)
          const {map, maps} = loaded
          apiIsLoaded(map, maps, validPoints)
        }}
      >
        {validPoints.map((point, i) => (
          <Marker
            lat={point.lat}
            lng={point.lng}
            description={point?.description}
            id={point?._id}
            key={point._key ?? i}
          />
        ))}
      </GoogleMapReact>
    </div>
  )
}

Map.propTypes = {
  center: PropTypes.objectOf({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  mapPoints: PropTypes.arrayOf(PropTypes.object),
  zoom: PropTypes.number,
}

Map.defaultProps = {
  center: {
    lat: 40.7058254,
    lng: -74.1180863,
  },
  zoom: 15,
  mapPoints: [],
}
