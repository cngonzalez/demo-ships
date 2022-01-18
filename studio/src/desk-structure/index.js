import S from '@sanity/desk-tool/structure-builder'
import {GiKnifeFork} from 'react-icons/gi'
import {views, documentsPane} from './views'

export const getDefaultDocumentNode = ({schemaType}) => {
  if (['menu', 'ship', 'sailing', 'port'].includes(schemaType)) {
    return S.document().views([S.view.form(), ...views])
  } else if (['keyIngredient', 'menuItem'].includes(schemaType)) {
    return S.document().views([
      S.view.form(), documentsPane])
  }

  return S.document()
}

const items = [
  S.documentTypeListItem('port').title('Ports'),
  S.documentTypeListItem('ship').title('Ships'),
  S.documentTypeListItem('sailing').title('Sailings'),
  S.divider(),
  S.listItem()
    .title('Dining Options')
    .icon(GiKnifeFork)
    .child(
      S.list()
        .title('Dining Options')
        .items([
          S.documentTypeListItem('menu').title('Menus'),
          S.documentTypeListItem('menuItem').title('Menu Items'),
          S.documentTypeListItem('keyIngredient').title('Key Ingredients'),
          S.documentTypeListItem('venue').title('Venues'),
        ])
    )
  // ...S.documentTypeListItems().filter((listItem) => !['article'].includes(listItem.getId())),
]

export default () => {
  return S.list().title('Content').items(items)
}
