import {MdOutlineSailing} from 'react-icons/md'

export default {
	name: 'sailing',
	title: 'Sailing',
	type: 'document',
	icon: MdOutlineSailing,
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
			name: 'ship',
			title: 'Ship',
			type: 'reference',
			to: [{ type: 'ship' }],
		},
		{
			name: 'embarkationDay',
			title: 'Embarkation Day',
			type: 'date'
		},
		{
			name: 'itinerary',
			title: 'Itinerary',
			type: 'array',
			of: [
				{ type: 'reference', to: [{type: 'port'}] }
			],
		},
	],
	//add menus -- menu, venue, valid from valid to
}