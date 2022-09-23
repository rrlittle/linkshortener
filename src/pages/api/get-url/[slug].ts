import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../db/client";

const getUrl = async (req: NextApiRequest, res: NextApiResponse) => {
  const notFound = (msg: string, statusCode: number = 404) => {
    res.statusCode = statusCode;
    res.send(JSON.stringify({ msg }));
  };

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");

  const slug = req?.query?.slug;

  if (!slug || typeof slug !== "string") {
    return notFound("pls use with a slug", 400);
  }

  const data = await client.shortLink.findFirst({
    where: { slug: { equals: slug } },
  });
  res.setHeader("Cache-Control", "s-maxage=100000, stale-while-revalidate");

  if (!data) {
    return notFound("slug not found");
  }

  return res.send(JSON.stringify(data));
};

export default getUrl;
