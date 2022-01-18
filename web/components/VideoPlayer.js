import PropTypes from 'prop-types'
import React from 'react'
import ReactPlayer from 'react-player'

export default function VideoPlayer({url}) {
  if (!url) return null

  const urlObj = new URL(url)
  const wrapperClasses = urlObj.hostname.includes('soundcloud') ? `min-h-[200px]` : `pt-[56.25%]`

  return (
    <div className={`relative ${wrapperClasses}`}>
      <ReactPlayer
        // playIcon={
        //   <button style={{background: 'red', padding: 200}} type="button">
        //     Play
        //   </button>
        // }
        className="absolute top-0 left-0"
        url={url}
        width="100%"
        height="100%"
      />
    </div>
  )
}

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
}
