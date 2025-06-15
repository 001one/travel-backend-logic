import {defineType, defineArrayMember} from 'sanity'

export const blockContentType = defineType({
  name: 'blockContent',
  type: 'array',
  title: 'Body',
  of: [
    defineArrayMember({type: 'block'}),
    defineArrayMember({type: 'youTube'}),
    defineArrayMember({type: 'externalImage'}), // ✅ include here
  ],
})
