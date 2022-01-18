/* eslint-disable react/jsx-no-bind */
import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Box, Popover, Button} from '@sanity/ui'
import {useRouter} from 'part:@sanity/base/router'
import {EditIcon} from '@sanity/icons'
import {FaMapMarkerAlt} from 'react-icons/fa'

const markerStyles = {
  color: `#febb02`,
  pointerEvents: `auto`,
}
export default function Marker({description, id}) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  return (
    <Box
      style={{
        width: 200,
        height: 40,
        fontSize: 40,
        transform: `translate(-50%, -100%)`, // Point centered above coordinate
        pointerEvents: `none`,
        textAlign: `center`,
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {description ? (
        <Popover
          content={
            <Button
              // fontSize={[2, 2, 3, 3]}
              text={description}
              icon={EditIcon}
              mode="ghost"
              tone="primary"
            />
          }
          padding={1}
          placement="top"
          portal
          open={open}
        >
          <Box
              onClick={() => (id ? router.navigateIntent('edit', {id, type: `port`}) : null)}
          >
            <FaMapMarkerAlt style={markerStyles} />
          </Box>
        </Popover>
      ) : (
        <FaMapMarkerAlt style={markerStyles} />
      )}
    </Box>
  )
}

Marker.defaultProps = {
  description: ``,
  id: ``,
}

Marker.propTypes = {
  description: PropTypes.string,
  id: PropTypes.string,
}
