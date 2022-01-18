export default {
	name: 'shipVenue',
	title: 'Ship Venue',
	type: 'object',
	fields: [
		{
			name: 'baseVenue',
			title: 'Base Venue',
			type: 'reference',
			to: [{ type: 'venue' }],
		},
		{
			name: 'venueOverrides',
			title: 'Venue Overrides',
			type: 'venue',
			options: {collapsible: true, collapsed: true},
		},
		{
			name: 'mainMenu',
			title: 'Main Menu',
			type: 'reference',
			to: [{ type: 'menu' }],
		},
		{
			name: 'menuOverride',
			title: 'Menu Override',
			type: 'menuOverride',
			options: {collapsible: true, collapsed: true},
		},
	],
  preview: {
    select: {
      baseName: 'baseVenue.name',
      overrideName: 'venueOverrides.name',
			baseImage: 'baseVenue.mainImage',
      overrideImage: 'venueOverrides.mainImage',
    },
    prepare({
			baseName, overrideName, baseImage, overrideImage
		}) {
      return {
        title: overrideName ?? baseName, 
        media: overrideImage ?? baseImage
      }
    },
  },
}
						