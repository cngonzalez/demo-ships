import { FaWineBottle } from "react-icons/fa";

export default {
	name: 'venue',
	title: 'Venue',
	type: 'document',
	icon: FaWineBottle,
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
			}
		},
		{
			name: 'description',
			title: 'Description',
			type: 'text',
		},
	],
}