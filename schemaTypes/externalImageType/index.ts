import {defineType, defineField} from 'sanity'

export const externalImageType = defineType({
  name: 'externalImage',
  type: 'object',
  title: 'External Image',
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'Image URL',
      validation: (Rule) =>
        Rule.uri({ scheme: ['http', 'https'] }).required().error('Enter a valid image URL'),
    }),
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alt Text',
    }),
  ],
})
