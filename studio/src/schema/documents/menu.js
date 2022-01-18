import {FaScroll} from 'react-icons/fa'

export default {
	name: 'menu',
	title: 'Menu',
	type: 'document',
	icon: FaScroll,
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
      options: {source: 'name'},
		},
		{
			name: 'starters',
			title: 'Starters',
			type: 'array',
			of: [{ type: 'reference', to: [{type: 'menuItem'}] }],
		},
		{
			name: 'entrees',
			title: 'Entrees',
			type: 'array',
			of: [{ type: 'reference', to: [{type: 'menuItem'}] }],
		},
		{
			name: 'desserts',
			title: 'Desserts',
			type: 'array',
			of: [{ type: 'reference', to: [{type: 'menuItem'}] }],
		},
		{
			name: 'otherCourses',
			title: 'Other Courses',
			type: 'array',
			of: [
				{ type: 'object',
					name: 'customCourse',
					title: 'Custom Course',
					fields: [
						{
							name: 'name',
							title: 'Name',
							type: 'string',
						},
						{
							name: 'items',
							title: 'Items',
							type: 'array',
							of: [{ type: 'reference', to: [{type: 'menuItem'}] }],
						},
					]
			}
		],
		},
	],
}