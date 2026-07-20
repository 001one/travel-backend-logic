import {defineField, defineType} from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Category Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'slug',
      title: 'Category Slug',
      type: 'slug',
      options: {
        source: 'title',
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'image',
      // Sanity allows selecting up to 5 referenced counts
      post0: 'posts.0.title',
      post1: 'posts.1.title',
      post2: 'posts.2.title',
    },
    prepare({title, media}) {
      return {
        title,
        media,
        subtitle: 'Category',
      }
    },
  },
})
