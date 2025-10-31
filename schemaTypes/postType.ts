import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
     defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      validation: (rule) => rule.required().min(1),
    }),
 defineField({
      name: 'excerpt', // ✅ New field added
      type: 'text',
      title: 'Excerpt',
      description: 'A short summary for SEO and previews.',
      validation: (rule) => rule.max(200), // Limit to 200 characters for SEO
    }),
    // ✅ UPDATE HERE
    defineField({
      name: 'body',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'youTube',
          options: {inline: true},
        },
        {
          type: 'externalImage', // ✅ this enables image URL block
        },
      ],
    }),
  ],
})
