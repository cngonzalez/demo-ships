import {groq} from 'next-sanity'

export const articleQuery = groq`
  *[_type == "article" && slug.current == $slug] {
    ...,
    content[] {
        ...,
        _type == "videoEmbed" => { video-> },
        _type == "mainImage" => { ..., image { ...,asset-> } },
        _type == "button" => { ..., link {
            ...,
            "reference": reference->slug.current,
            }
        }, 
        _type == "pageBuilderHero" => { 
            ..., 
            "authors": ^.authors[]->
        },
    }
  }
`
export const menuQuery = groq`
  *[_type == 'menu' && slug.current == $slug]{
    name,
    'courses': [
      {
        'name': 'Starters',
        'items': @.starters[]->{
          ...,
          mainImage{asset->},
          keyIngredients[]->{available}
         }
      },
      {
        'name': 'Entrees',
        'items': @.entrees[]->{
          ...,
          mainImage{asset->},
          keyIngredients[]->{available}
         }
      },
      {
        'name': 'Desserts',
        'items': @.desserts[]->{
          ...,
          mainImage{asset->},
          keyIngredients[]->{available}
         }
      },
      ...@.otherCourses[]{
        name,
        items[]->{
          ...,
          mainImage{asset->},
          keyIngredients[]->{available}   
        }
      }
  ]
  }
`

export const shipQuery = groq`
*[_type == 'ship' && slug.current == $slug]{
  ...,
  mainImage{..., asset->},
  shipVenues[]{
    ...,
    'name': coalesce(venueOverrides.name, baseVenue->name),
    'description': coalesce(venueOverrides.description, baseVenue->description),
    'mainImage': coalesce(venueOverrides.mainImage{..., asset->}, baseVenue->mainImage{..., asset->}),
    mainMenu->,
    menuOverride{..., menu->}
  }
}
`

export const sailingQuery = groq`
*[_type == 'sailing' && slug.current == $slug]{
  ...,
  mainImage{..., asset->},
  itinerary[]->{..., mainImage{..., asset->}},
  ship->{
    ...,
    shipVenues[]{
      ...,
      'name': coalesce(venueOverrides.name, baseVenue->name),
      'description': coalesce(venueOverrides.description, baseVenue->description),
      'mainImage': coalesce(venueOverrides.mainImage{..., asset->}, baseVenue->mainImage{..., asset->}),
      mainMenu->,
      menuOverride{..., menu->}
    }
  }
}
`

export const portQuery = groq`
  *[_type == "port" && slug.current == $slug] {
    ...,
    mainImage{..., asset->},
    description[] {
        ...,
        _type == "videoEmbed" => { video-> },
        _type == "mainImage" => { ..., image { ...,asset-> } },
        _type == "button" => { ..., link {
            ...,
            "reference": reference->slug.current,
            }
        }, 
        _type == "pageBuilderHero" => { 
            ..., 
            "authors": ^.authors[]->
        },
    }
  }
`