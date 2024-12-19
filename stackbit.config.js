// import { ContentfulContentSource } from '@stackbit/cms-contentful'
import { defineStackbitConfig } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  stackbitVersion: "~0.6.0",
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ["content"],
      models: [
        {
          name: "Page",
          type: "page",
          urlPath: "/{slug}",
          filePath: "content/pages/{slug}.json",
          fields: [{ name: "title", type: "string", required: true }]
        }
      ],
      assetsConfig: {
        referenceType: "static",
        staticDir: "public",
        uploadDir: "images",
        publicPath: "/"
      }
    })
  ]
});


// export default {
//   stackbitVersion: '~0.6.0',
//   ssgName: 'nextjs',
//   nodeVersion: '18',
//   contentSources: [
//     new ContentfulContentSource({
//       spaceId: process.env.CONTENTFUL_SPACE_ID,
//       environment: process.env.CONTENTFUL_ENVIRONMENT,
//       previewToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
//       accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
//     }),
//   ],
//   modelExtensions: [{ 
//     name: 'page', 
//     fields: [
//       {
//         type: 'enum',
//         name: 'width',
//         label: 'Width',
//         group: 'design',
//         controlType: 'button-group',
//         options: [
//           { label: 'Narrow', value: 'narrow' },
//           { label: 'Wide', value: 'wide' },
//           { label: 'Full', value: 'full' },
//         ],
//       },
//     ],
//   }],
// }