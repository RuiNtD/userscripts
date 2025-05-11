import "./meta.js?userscript-metadata";
import { onNavigate } from "@violentmonkey/url";

interface Bang {
  c: string; // category
  d: string; // domain
  r: number; // ranking
  s: string; // title
  sc: string; // sub-category
  t: string; // trigger
  u: string; // url
}

// Modified from https://github.com/t3dotgg/unduck
function getBangUrl(query: string): string | undefined {
  const match = query.match(/!(\S+)/i);

  const bangTag = match?.[1]?.toLowerCase();
  if (!bangTag) return;

  const bangs: Bang[] = JSON.parse(GM_getResourceText("bangs"));
  const bang = bangs.find((b) => b.t == bangTag);
  if (!bang) return null;

  const cleanQuery = query.replace(/!\S+\s*/i, "").trim();
  if (!cleanQuery) return `https://${bang.d}`;

  return bang.u.replace("{{{s}}}", encodeURIComponent(cleanQuery));
}

function checkQuery() {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  const qInput = document.querySelector<HTMLInputElement>("input#q");

  const query = (
    params.get("q") ||
    params.get("query") ||
    qInput?.value ||
    ""
  ).trim();
  if (!query) return;
  console.log("!bangAnywhere Query:", query);

  const bangUrl = getBangUrl(query);
  console.log("!bangAnywhere Redirect:", bangUrl);
  if (bangUrl) window.location.replace(bangUrl);
}

onNavigate(checkQuery);
checkQuery();
