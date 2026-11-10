// Builds the website in each language from src/template.html and src/strings.json:
//   index.html (English), es/index.html, fr/index.html, de/index.html, pt/index.html
// Run after editing either file:  node build.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const SITE = "https://macdat-git.github.io/maker-network-website/";
const template = readFileSync("src/template.html", "utf8");
const strings = JSON.parse(readFileSync("src/strings.json", "utf8"));
const langs = Object.keys(strings); // "en" first
const OG_LOCALE = { en: "en_US", es: "es_ES", fr: "fr_FR", de: "de_DE", pt: "pt_BR" };
const pathFor = (lang) => (lang === "en" ? "" : `${lang}/`);

// On the English page only: send first-time visitors to their browser's language,
// unless they've picked a language with the switcher before.
const REDIRECT = `<script>
    (function () {
      try {
        if (localStorage.getItem("mn-lang")) return;
        var pages = { ${langs.filter((l) => l !== "en").map((l) => `${l}: "${l}/"`).join(", ")} };
        var lang = (navigator.language || "en").slice(0, 2).toLowerCase();
        if (pages[lang]) location.replace(pages[lang] + location.hash);
      } catch (e) {}
    })();
  </script>
  `;

for (const lang of langs) {
  const t = strings[lang];
  const root = lang === "en" ? "" : "../";
  const vars = {
    lang,
    root,
    path: pathFor(lang),
    ogLocale: OG_LOCALE[lang] ?? lang,
    redirect: lang === "en" ? REDIRECT : "",
    alternates: [
      ...langs.map((l) => `<link rel="alternate" hreflang="${l}" href="${SITE}${pathFor(l)}">`),
      `<link rel="alternate" hreflang="x-default" href="${SITE}">`,
    ].join("\n  "),
    switcher: langs
      .map((l) => (l === lang
        ? `<strong>${strings[l].langName}</strong>`
        : `<a href="${root}${pathFor(l)}" hreflang="${l}" lang="${l}" data-lang="${l}">${strings[l].langName}</a>`))
      .join(" · "),
  };
  const html = template
    .replace(/^<!--.*-->\n/, "")
    .replace(/\{\{([\w.]+)\}\}/g, (m, key) => {
      if (key in vars) return vars[key];
      if (key in t) return t[key];
      throw new Error(`Missing "${key}" for ${lang}`);
    });
  const out = lang === "en" ? "index.html" : `${lang}/index.html`;
  if (lang !== "en") mkdirSync(lang, { recursive: true });
  writeFileSync(out, html);
  console.log(`Wrote ${out}`);
}
