import { FaCarrot } from "react-icons/fa";

export default {
	name: 'keyIngredient',
	title: 'Key Ingredient',
	type: 'document',
	icon: FaCarrot,
	fields: [
		{
			name: 'name',
			title: 'Name',
			type: 'string',
		},
		{
			name: 'available',
			title: 'Available',
			type: 'boolean',
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
	initialValue: {
		available: true
	}
}