import {FaShip} from 'react-icons/fa'

          
export default {
	name: 'ship',
	title: 'Ship',
	type: 'document',
	icon: FaShip,
	fields: [
		{
			name: 'name',
			title: 'Name',
			type: 'string',
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {source: 'name'}
		},
	  {
	  	name: 'description',
	  	title: 'Description',
	  	type: 'text',
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
			name: 'class',
			title: 'Class',
			type: 'string',
			options: {
				list: [
					'Deep Blue',
					'Coraline',
					'Regency',
				]
			}
		},
		{
			name: 'shipVenues',
			title: 'Ship Venues',
			type: 'array',
			of: [
				{type: 'shipVenue'}
			],
		},
	],
  preview: {
    select: {
      title: 'name',
      subtitle: 'class',
    },
	}
}