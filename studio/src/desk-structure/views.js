import S from '@sanity/desk-tool/structure-builder'
import Iframe from 'sanity-plugin-iframe-pane'
import SeoPane from 'sanity-plugin-seo-pane'
import MapPane from '../components/MapPane'
import DocumentsPane from 'sanity-plugin-documents-pane'

import resolveProductionUrl from '../helpers/resolveProductionUrl'

export const documentsPane = S.view
      .component(DocumentsPane)
      .options({
        query: `*[!(_id in path("drafts.**")) && references($id)]`,
        params: {id: `_id`},
        useDraft: false,
        debug: true,
      })
      .title('Incoming References')

export const views = [
  S.view
    .component(Iframe)
    .options({
      url: (doc) => resolveProductionUrl(doc, `${doc._type}s/${doc.slug.current}`),
    })
    .title('Preview'),
  S.view
    .component(SeoPane)
    .options({
      keywords: 'seo.keywords',
      synonyms: 'seo.synonyms',
      url: (doc) => resolveProductionUrl(doc, `${doc._type}s/${doc.slug.current}`),
    })
    .title('SEO'),
    documentsPane,
    S.view.component(MapPane).title('Map'),
]

export const getViews = (schemaType) => {
  console.log(schemaType)
  if (['port, sailing'].includes(schemaType)) {
    return views
  } else {
    return views.slice(0, -1)
  }
}
