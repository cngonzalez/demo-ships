import {extractWithPath} from '@sanity/mutator'
import get from 'lodash/get'

// (There's a good chance there's a simpler way to do this)
// Finds every _type object in the document
// And returns that object's value
export function getGeopointsFromDoc(doc) {
  return (
    extractWithPath(`.._type`, doc)
      // Filters to just geopoints
      .filter((match) => match.value === 'geopoint')
      // Grab's the object's value
      .map((match) => {
        const pathWithoutEnd = match.path.slice(0, match.path.length - 1).join('.')

        return get(doc, pathWithoutEnd)
      })
  )
}
