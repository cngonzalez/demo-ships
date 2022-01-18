import { FaHamburger } from "react-icons/fa"

export default {
	name: 'menuItem',
	title: 'Menu item',
	type: 'document',
	icon: FaHamburger,
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
				hotspot: true
			}
		},
		{
			name: 'description',
			title: 'Description',
			type: 'text',
		},
		{
			name: 'keyIngredients',
			title: 'Key Ingredients',
			type: 'array',
			of: [{ type: 'reference', to: [{type: 'keyIngredient'}] }],
		},
		{
			name: 'dietaryRestriction',
			title: 'Dietary Restriction',
			type: 'string',
			options: {
				list: [
					'shellfish',
					'dairy',
					'tree nuts'
				]
			}
		},
	],
}