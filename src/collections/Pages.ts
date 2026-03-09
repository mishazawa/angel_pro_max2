import type { CollectionConfig } from "payload";
import { BlocksFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { CodeBlock } from "./blocks/CodeBlock";

export const Pages: CollectionConfig = {
  slug: "pages",
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ["title"],
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "content",
      type: "richText",
      admin: {
        description: "Some text for administrator",
      },
      editor: lexicalEditor({
        admin: {
          hideGutter: true,
          placeholder: "",
        },
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          BlocksFeature({
            blocks: [
              CodeBlock({
                slug: "code",
              }),
            ],
          }),
        ],
      }),
    },
  ],
};
