import { ContentfulContentSource } from '@stackbit/cms-contentful'

export default {
  stackbitVersion: '~0.6.0',
  ssgName: 'nextjs',
  nodeVersion: '16',
  contentSources: [
    new ContentfulContentSource({
      spaceId: process.env.CONTENTFUL_SPACE_ID,
      environment: process.env.CONTENTFUL_ENVIRONMENT,
      previewToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
      accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
    }),
  ],
  modelExtensions: [{ 
    name: 'page', 
    fields: [
      {
        type: 'enum',
        name: 'width',
        label: 'Width',
        group: 'design',
        controlType: 'button-group',
        options: [
          { label: 'Narrow', value: 'narrow' },
          { label: 'Wide', value: 'wide' },
          { label: 'Full', value: 'full' },
        ],
      },
    ],
  }],
}