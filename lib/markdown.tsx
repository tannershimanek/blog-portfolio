import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface Asset {
  sys: {
    id: string;
  };
  url: string;
  description: string;
}

interface AssetLink {
  block: Asset[];
}

interface Content {
  json: any;
  links: {
    entries: any;
    assets: AssetLink;
  };
}

function RichTextAsset({
  id,
  assets,
}: {
  id: string;
  assets: Asset[] | undefined;
}) {
  const asset = assets?.find((asset) => asset.sys.id === id);

  if (asset?.url) {
    return (
      <img
        className="rounded-2xl border border-zinc-100 dark:border-zinc-700/40"
        width="100%"
        src={asset.url}
        alt={asset.description}
      />
    );
  }

  return null;
}

export function Markdown({ content }: { content: Content }) {
  return documentToReactComponents(content.json, {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => (
        <RichTextAsset
          id={node.data.target.sys.id}
          assets={content.links.assets.block}
        />
      ),
      [BLOCKS.PARAGRAPH]: (node, children) => {
        if (
          node.content.length === 1 &&
          node.content[0].nodeType === "text" &&
          node.content[0].marks.some((mark) => mark.type === MARKS.CODE)
        ) {
          return (
            <SyntaxHighlighter language="javascript" style={docco}>
              {node.content[0].value}
            </SyntaxHighlighter>
          );
        }
        return <p>{children}</p>;
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
        // const entry = content.links.entries.block.find(
        //   (entry: { sys: { id: string; }; }) => entry.sys.id === node.data.target.sys.id
        // );

        // if (entry && entry.__typename === 'CodeBlock') {
        //   return (
        //     <SyntaxHighlighter language={entry.language} style={docco}>
        //       {'any'}
        //     </SyntaxHighlighter>
        //   );
        // }
        // Handle other entry types as needed
        return <div>Unsupported entry type</div>;
      },
      [INLINES.EMBEDDED_ENTRY]: (node) => {
        // const entry = content.links.entries.inline.find(
        //   (entry: any) => entry.sys.id === node.data.target.sys.id
        // );

        console.log(node.data);

        // if (entry && entry.__typename === 'CodeBlock') {
        //   return (
        //     <SyntaxHighlighter language={entry.language} style={docco}>
        //       {entry.code}
        //     </SyntaxHighlighter>
        //   );
        // }
        // Handle other entry types as needed
        return <span>Unsupported inline entry type</span>;
      },
    },
    renderMark: {
      [MARKS.CODE]: (node: any) => (
        <SyntaxHighlighter language="javascript" style={docco}>
          {node}
        </SyntaxHighlighter>
      ),
    },
  });
}
