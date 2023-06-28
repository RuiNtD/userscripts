// ==UserScript==
// @name         Nintendo 64 Controller Stock Notifier
// @namespace    https://github.com/RuiNtD
// @version      1.0.1
// @description  Notifies you when the Nintendo 64 Controller for Switch Online is in stock.
// @author       RuiNtD
// @match        https://www.nintendo.com/store/products/nintendo-64-controller/
// @icon         https://icons.duckduckgo.com/ip2/nintendo.com.ico
// @grant        GM.notification
// @grant        GM.getResourceURL
// @grant        window.focus
// @resource     image https://assets.nintendo.eu/image/upload/f_auto/q_auto/t_product_tile_desktop/v1/MNS/NOE/000000000010006981/1.1_ProductTile_Accessories_Nintendo64Controller_OutOfBox_enNOE?_a=ATAK9ZQ0
// @license      MIT
// ==/UserScript==

const refreshTime = 30 * 60000; // Every 30 minutes
const remindTime = 5 * 60000; // Every 5 minutes

function notify() {
  GM.notification({
    title: "Nintendo 64 Controller",
    text: "IN STOCK!",
    image: GM.getResourceURL("image"),
    highlight: true,
    onclick: () => window.focus(),
  });
}

const helperText =
  document.querySelector('span[data-testid="helperText"]')?.innerText || "";
if (helperText.startsWith("This item is currently unavailable"))
  setTimeout(() => location.reload(), refreshTime);
else {
  notify();
  setInterval(() => location.reload(), remindTime);
}
