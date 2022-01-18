import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import port from './documents/port'
import keyIngredient from './documents/keyIngredient'
import menu from './documents/menu'
import menuItem from './documents/menuItem'
import sailing from './documents/sailing'
import ship from './documents/ship'
import venue from './documents/venue'

// Objects
import pageBuilderColumns from './objects/pageBuilderColumns'
import pageBuilderContent from './objects/pageBuilderContent'
import pageBuilderHero from './objects/pageBuilderHero'
import pageBuilderImage from './objects/pageBuilderImage'
import portableText from './objects/portableText'
import seo from './objects/seo'
import mainImage from './objects/mainImage'
import column from './objects/column'
import button from './objects/button'
import download from './objects/download'
import video from './objects/video'
import link from './objects/link'
import pageBuilderLocation from './objects/pageBuilderLocation'

import shipVenue from './objects/shipVenue'
import menuOverride from './objects/menuOverride'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    port,
    keyIngredient,
    menu,
    menuItem,
    ship,
    sailing,
    venue,

    // Objects
    column,
    pageBuilderColumns,
    pageBuilderContent,
    pageBuilderHero,
    pageBuilderImage,
    pageBuilderLocation,
    portableText,
    mainImage,
    seo,
    button,
    download,
    video,
    link,
    shipVenue,
    menuOverride
  ]),
})
