import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      title: 'Excerpt (SEO Description)',
      description: 'Keep this under 150 characters (~20 words) for best Google display.',
      rows: 3,
      validation: (rule) =>
        rule
          .required()
          .min(50)
          .max(150)
          .warning('Keep between 50–150 characters for best SEO results.'),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Cover Image (Optional)',
      description: 'Used as the Open Graph image when sharing on social media.',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'youTube',
          options: {inline: true},
        },
        {
          type: 'externalImage',
        },
      ],
    }),
  ],
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
})
