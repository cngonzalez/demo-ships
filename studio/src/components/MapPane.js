import PropTypes from 'prop-types'
import React from 'react'
import config from 'config:@sanity/google-maps-input'

import Map from './Map'
import {getGeopointsFromDoc} from './getGeopointsFromDoc'

export default function MapPane(props) {
  const doc = props?.document?.draft || props?.document?.published

  const mapPoints = getGeopointsFromDoc(doc)

  return (
    <Map
      mapPoints={mapPoints}
      key={config?.apiKey}
      zoom={config?.defaultZoom}
      center={config?.defaultLocation}
    />
  )
}

MapPane.propTypes = {
  document: PropTypes.shape({
    draft: PropTypes.object,
    published: PropTypes.object,
  }).isRequired,
}
