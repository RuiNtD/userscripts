// ==UserScript==
// @name         !bang Anywhere
// @namespace    https://github.com/RuiNtD
// @version      1.0.1
// @description  Use DuckDuckGo !bangs (almost) anywhere
// @author       RuiNtD
// @match        https://*.google.com/search?*
// @match        https://*.bing.com/search?*
// @match        https://search.brave.com/search?*
// @match        https://*.qwant.com/?*
// @match        https://*.startpage.com/*/search*
// @icon         https://icons.duckduckgo.com/ip2/duckduckgo.com.ico
// @grant        GM.xmlHttpRequest
// @connect      duckduckgo.com
// @license      MIT
// ==/UserScript==

const $ = document.querySelector.bind(document);
const url = new URL(location);
const { searchParams: params } = url;
const query = params.get("q") || params.get("query") || $("input#q").value;
console.log("!bA", query);
if (query.indexOf("!") >= 0) {
  const apiParams = new URLSearchParams({
    q: query,
    format: "json",
    no_redirect: "1",
  });
  GM.xmlhttpRequest({
    url: "https://duckduckgo.com/?" + apiParams,
    responseType: "json",
    onload: function ({ response }) {
      const redirectUrl = response.Redirect;
      if (redirectUrl) location = redirectUrl;
    },
  });
}
