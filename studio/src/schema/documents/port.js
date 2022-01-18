import {FaCity} from 'react-icons/fa'

export default {
  name: 'port',
  title: 'Port',
  icon: FaCity,
  type: 'document',

  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
        crop: true
      }
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name'},
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'portableText',
    },
    {type: 'geopoint', name: 'location', description: 'Primary location used for meta tags'},
    {
      name: 'keyLocations',
      title: 'Key Locations',
      description: 'Key places at this port-of-call to include on customer-facing information',
      type: 'array',
      of: [{type: 'pageBuilderLocation'}]

    },
    {type: 'seo', name: 'seo', title: 'SEO'},
  ],
  preview: {
    select: {
      title: 'name',
      media: 'mainImage',
    },
    prepare({title, media}) {
      return {
        title,
        media,
      }
    },
  },
}
