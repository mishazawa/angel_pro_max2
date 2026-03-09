import { getPayload, Payload } from "payload";

import config from "@/payload.config";
import "./styles.css";
import Link from "next/link";
import { Page } from "@/payload-types";
export type PageData = Pick<Page, "title" | "id">;

export default async function HomePage() {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  const result = await getPages(payload);
  return (
    <div className="home">
      <div className="content">
        {result.docs.map((page: PageData) => {
          return (
            <Link href={`/pages/${page.id}`} key={page.id}>
              {page.title}
            </Link>
          );
        })}
      </div>
      <div className="footer"></div>
    </div>
  );
}

async function getPages(payload: Payload) {
  const posts = await payload.find({
    collection: "pages",
    limit: 10,
    page: 1,
  });

  return posts;
}
