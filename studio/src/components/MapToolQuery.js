import React, {useEffect, useState} from 'react'
import {Box, Card, Flex, Spinner} from '@sanity/ui'
import sanityClient from 'part:@sanity/base/client'
import config from 'config:@sanity/google-maps-input'

import {getGeopointsFromDoc} from './getGeopointsFromDoc'
import Map from './Map'

const apiVersion = `2021-05-19`
const client = sanityClient.withConfig({apiVersion})

export default function MapToolQuery() {
  const [portMapPoints, setPortMapPoints] = useState([])

  useEffect(() => {
    if (!portMapPoints?.length) {
      client.fetch(`*[_type == "port"
    ]{...location, _id, _key, 'description': name}`).then((result) => {
        if (!result.length) return setPortMapPoints('NOT FOUND')
        console.log(result)

        return setPortMapPoints(result)
      })
    }
  }, [])

  if (portMapPoints === 'NOT FOUND') {
    return (
      <Box>
        <Card tone="caution">No Documents matched the query</Card>
      </Box>
    )
  }

  if (!portMapPoints?.length) {
    return (
      <Flex padding={5} align="center" justify="center" style={{width: `100vw`, height: `100%`}}>
        <Spinner />
      </Flex>
    )
  }

  return (
    <Map
      mapPoints={portMapPoints}
      key={config?.apiKey}
      zoom={config?.defaultZoom}
      center={config?.defaultLocation}
    />
  )
}
