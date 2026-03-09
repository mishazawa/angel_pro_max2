import { draftMode } from "next/headers";
import { getPayload } from "payload";
import { cache } from "react";
import configPromise from "@payload-config";
import { JSXConvertersFunction, RichText as RTConv } from "@payloadcms/richtext-lexical/react";
import { DefaultNodeTypes, SerializedBlockNode } from "@payloadcms/richtext-lexical";

import { CodeComponent } from "@/collections/blocks/CodeBlock/Component/Code";
import { cn } from "@/utils/ui";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { CodeBlockBlockComponent } from "@/collections/blocks/CodeBlock/Component/Block";
type Args = {
  params: Promise<{
    id?: string;
  }>;
};

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode();
  const { id = "" } = await paramsPromise;
  const post = await queryPageById({ id });

  if (!post) return <>zalupa nothing...</>;
  return (
    <article className="pt-16 pb-16">
      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <h1>{post.title}</h1>
          <RTConv
            converters={jsxConverters as unknown as any}
            className={cn("payload-richtext", {
              container: false,
              "max-w-none": !false,
              "mx-auto prose md:prose-md dark:prose-invert": false,
            })}
            data={post.content as SerializedEditorState}
          />
        </div>
      </div>
    </article>
  );
}

const queryPageById = cache(async ({ id }: { id: string }) => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "pages",
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      id: {
        equals: id,
      },
    },
  });

  return result.docs?.[0] || null;
});

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<any>;
function jsxConverters({ defaultConverters }: any): JSXConvertersFunction<NodeTypes> {
  return {
    ...defaultConverters,
    blocks: {
      code: ({ node }: any) => <div>code block not work yet</div>,
    },
  };
}
