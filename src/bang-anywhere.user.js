// ==UserScript==
// @name         !bangAnywhere
// @namespace    https://github.com/RuiNtD
// @version      1.1.0
// @description  Use DuckDuckGo !bangs (almost) anywhere
// @author       RuiNtD
// @match        https://*.google.com/search?*
// @match        https://*.bing.com/search?*
// @match        https://search.brave.com/search?*
// @match        https://*.qwant.com/?*
// @match        https://*.startpage.com/*/search*
// @icon         https://icons.duckduckgo.com/ip2/duckduckgo.com.ico
// @grant        GM_getResourceText
// @resource bangs https://duckduckgo.com/bang.js
// @license      MIT
// ==/UserScript==

(function () {
  "use strict";

  const url = new URL(location.href);
  const { searchParams: params } = url;
  /** @type HTMLInputElement */
  const qInput = document.querySelector("input#q");
  const query = (
    params.get("q") ||
    params.get("query") ||
    qInput?.value ||
    ""
  ).trim();
  if (!query) return;
  console.log("!bangAnywhere Query:", query);

  const bangs = JSON.parse(GM_getResourceText("bangs"));

  // Taken from https://github.com/t3dotgg/unduck
  /**
   * @param {string} query
   * @returns {string | undefined}
   * */
  function getBangUrl(query) {
    const match = query.match(/!(\S+)/i);

    const bangTag = match?.[1]?.toLowerCase();
    const bang = bangs.find((b) => b.t == bangTag);
    if (!bang) return null;

    const cleanQuery = query.replace(/!\S+\s*/i, "").trim();
    if (!cleanQuery) return `https://${bang.d}`;

    return bang.u.replace("{{{s}}}", encodeURIComponent(cleanQuery));
  }

  const bangUrl = getBangUrl(query);
  console.log("!bangAnywhere Redirect:", bangUrl);
  if (bangUrl) location.href = bangUrl;
})();
