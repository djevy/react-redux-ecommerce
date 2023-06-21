import {createClient} from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "61oriq29",
  dataset: "production",
  apiVersion: "2022-06-19",
  useCdn: true,
  token: process.env.PUBLIC_SANITY_TOKEN,
});
const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => {
  if (source !== undefined) return builder.image(source);
};
