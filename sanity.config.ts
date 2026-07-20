import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'travel',

  projectId: '1flegcde',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('Posts').child(S.documentTypeList('post')),

            S.listItem()
              .title('Categories')
              .child(
                S.documentTypeList('category').child((categoryId) =>
                  S.list()
                    .title('Category')
                    .items([
                      S.listItem()
                        .title('Edit Category')
                        .child(S.document().documentId(categoryId).schemaType('category')),
                      S.listItem()
                        .title('Posts in this Category')
                        .child(
                          S.documentList()
                            .title('Posts')
                            .filter('_type == "post" && references($id)')
                            .params({id: categoryId}),
                        ),
                    ]),
                ),
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
