import { defineArrayMember, defineField, defineType } from 'sanity';

const imageFields = [
  defineField({ name: 'alt', title: 'Alternative text', type: 'string', description: 'Describe the image for readers using screen readers.', validation: rule => rule.required() }),
  defineField({ name: 'caption', title: 'Caption', type: 'string' }),
];

export const post = defineType({
  name: 'post', title: 'Blog posts', type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: rule => rule.required().max(180) }),
    defineField({
      name: 'slug', title: 'Article URL', type: 'slug',
      description: 'Click Generate. Keep this unchanged after publishing so existing links continue to work.',
      options: { source: 'title', maxLength: 96 },
      validation: rule => rule.required().custom(value => !value?.current || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.current)
        ? true : 'Use lowercase letters, numbers, and single hyphens.'),
    }),
    defineField({ name: 'excerpt', title: 'Short introduction', type: 'text', rows: 3, description: 'Shown on the Blog page and in sharing previews.', validation: rule => rule.required().min(10).max(300) }),
    defineField({ name: 'category', title: 'Post type', type: 'string', initialValue: 'insight', options: { list: [{ title: 'Guide / Insight', value: 'insight' }, { title: 'Product update', value: 'update' }], layout: 'radio' }, validation: rule => rule.required() }),
    defineField({ name: 'author', title: 'Author', type: 'string', initialValue: 'VehicleProof', validation: rule => rule.required() }),
    defineField({ name: 'publishedAt', title: 'Publication date', type: 'datetime', initialValue: () => new Date().toISOString(), description: 'Set to today when you publish. Future-dated posts stay hidden until that date; this field does not publish drafts automatically.', validation: rule => rule.required() }),
    defineField({ name: 'coverImage', title: 'Cover image', type: 'image', fields: imageFields }),
    defineField({
      name: 'body', title: 'Article', type: 'array', validation: rule => rule.required().min(1),
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{ title: 'Paragraph', value: 'normal' }, { title: 'Heading', value: 'h2' }, { title: 'Subheading', value: 'h3' }, { title: 'Quote', value: 'blockquote' }],
          lists: [{ title: 'Bullet list', value: 'bullet' }, { title: 'Numbered list', value: 'number' }],
          marks: {
            decorators: [{ title: 'Bold', value: 'strong' }, { title: 'Italic', value: 'em' }, { title: 'Code', value: 'code' }],
            annotations: [{ name: 'link', title: 'Link', type: 'object', fields: [defineField({ name: 'href', title: 'URL', type: 'url', validation: rule => rule.required().uri({ scheme: ['http', 'https', 'mailto'], allowRelative: true }) })] }],
          },
        }),
        defineArrayMember({ type: 'image', fields: imageFields }),
      ],
    }),
  ],
  orderings: [{ title: 'Newest first', name: 'newest', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'author', media: 'coverImage' } },
});
