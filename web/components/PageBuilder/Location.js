import React from 'react'
import PropTypes from 'prop-types'
import {LocationMarkerIcon} from '@heroicons/react/outline'

import SanityImage from '../SanityImage'

export default function Location({title, image, location}) {
  const {lng, lat} = location ?? {}

  return (
    <div className="relative">
      {image && <SanityImage image={image} className="w-full h-auto" width={1500} height={500} />}
      <div className="absolute top-0 right-0 m-4 md:m-8 p-4 md:p-8 max-w-sm bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 border border-gray-100 bg-white rounded-lg">
        <h2 className="text-xl md:text-2xl">{title}</h2>
        <div className="flex items-center gap-x-2 border-t border-white mt-2">
          <LocationMarkerIcon className="w-5 h-auto" />
          <div className="border-l border-white mr-2 p-2">
            <code className="text-xs leading-none">
              {lat}, {lng}
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}
