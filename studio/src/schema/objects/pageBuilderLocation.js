import {FiMapPin} from 'react-icons/fi'

export default {
  name: 'pageBuilderLocation',
  title: 'Location',
  type: 'object',
  icon: FiMapPin,
  fields: [
    {name: 'title', type: 'string'},
    {
      name: 'location',
      title: 'Location',
      type: 'geopoint',
    },
    {
      name: 'image',
      type: 'mainImage',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const {title} = selection
      return {
        title,
        subtitle: 'Location',
        media: FiMapPin,
      }
    },
  },
}
