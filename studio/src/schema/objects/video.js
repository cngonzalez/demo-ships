import React from 'react'
import PropTypes from 'prop-types'
import {FiVideo} from 'react-icons/fi'

// Import issues with react-player in Studio fixed by importing each one individually
import ReactPlayerYoutube from 'react-player/youtube'
import ReactPlayerVimeo from 'react-player/vimeo'
import ReactPlayerSoundCloud from 'react-player/soundcloud'

const playerWrapperStyles = {
  position: `relative`,
  paddingTop: `56.25%`,
}

const playerStyles = {
  position: `absolute`,
  top: 0,
  left: 0,
}

const VideoPreview = ({value}) => {
  const {url} = value

  if (!url) return null

  let player
  const urlObj = new URL(url)

  const playerProps = {
    url,
    width: `100%`,
    height: `100%`,
  }

  switch (urlObj?.hostname) {
    case 'youtube.com':
    case 'www.youtube.com':
      player = (
        <div style={playerWrapperStyles}>
          <ReactPlayerYoutube style={playerStyles} {...playerProps} />
        </div>
      )
      break
    case 'vimeo.com':
      player = (
        <div style={playerWrapperStyles}>
          <ReactPlayerVimeo style={playerStyles} {...playerProps} />
        </div>
      )
      break
    case 'soundcloud.com':
      player = (
        <div style={{minHeight: 150}}>
          <ReactPlayerSoundCloud style={playerStyles} {...playerProps} />
        </div>
      )
      break

    default:
      player = null
  }

  if (!player) return null

  return player
}

VideoPreview.propTypes = {
  value: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
}

export default {
  name: 'video',
  type: 'object',
  title: 'Media',
  icon: FiVideo,
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'Media URL',
      description: `Accepts: YouTube, Facebook, Twitch, SoundCloud, Streamable, Vimeo, Wistia, Mixcloud, DailyMotion and Kaltura`,
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      url: 'url',
    },
    component: VideoPreview,
  },
}
