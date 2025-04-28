import "./meta.js?userscript-metadata";

const refreshTime = 30 * 60000; // Every 30 minutes
const remindTime = 5 * 60000; // Every 5 minutes

async function notify() {
  GM.notification({
    title: "Nintendo 64 Controller",
    text: "IN STOCK!",
    image: await GM.getResourceUrl("image"),
    highlight: true,
    onclick: () => window.focus(),
  });
}

const helperSpan = document.querySelector<HTMLSpanElement>(
  'span[data-testid="helperText"]',
);
const helperText = helperSpan ? helperSpan.innerText : "";
if (helperText.startsWith("This item is currently unavailable"))
  setTimeout(() => location.reload(), refreshTime);
else {
  notify();
  setInterval(() => location.reload(), remindTime);
}
