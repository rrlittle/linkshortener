import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (req.nextUrl.pathname?.startsWith("/api/get-url")) {
    return;
  }
  const origin = req.nextUrl.origin;
  const slug = req.nextUrl.pathname.split("/").pop();
  const data = await fetch(`${origin}/api/get-url/${slug}`).then((r) =>
    r.json(),
  );
  if (data?.url) {
    return NextResponse.redirect(data.url);
  }
}
