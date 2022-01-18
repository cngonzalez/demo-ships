export default {
	name: 'menuOverride',
	title: 'Menu Override',
	type: 'object',
	fields: [
		{
			name: 'menu',
			title: 'Menu',
			type: 'reference',
			to: [{ type: 'menu' }],
		},
		{
			name: 'validFrom',
			title: 'Valid From',
			type: 'date',
		},
		{
			name: 'validTo',
			title: 'Valid To',
			type: 'date',
		},
	],
	preview: {
		select: {
			title: 'menu.name',
			validFrom: 'validFrom',
			validTo: 'validTo'
		},
		prepare: ({title, validFrom, validTo}) => {
			const subtitle = (validFrom && validTo) ?  `${validFrom} - ${validTo}` : ''
			return {title, subtitle}
		}
	}	
}