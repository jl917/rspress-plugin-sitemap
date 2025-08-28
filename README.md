# ⚠️ **This package is DEPRECATED**  

We are moving to the official plugin for compatibility with newer versions and more professional support.

Please use [@rspress/plugin-sitemap](https://www.npmjs.com/package/@rspress/plugin-sitemap) instead.


# rspress-plugin-sitemap ![NPM Version](https://img.shields.io/npm/v/rspress-plugin-sitemap)

Rspress plugin for Automatically generate SEO(Search Engine Optimization)-related sitemaps

## Usage

```bash
npm i rspress-plugin-sitemap
yarn add rspress-plugin-sitemap
pnpm add rspress-plugin-sitemap
```

```ts
import { defineConfig } from "rspress/config";
import sitemap from "rspress-plugin-sitemap";

export default defineConfig({
  plugins: [
    sitemap({
      domain: "https://rspress.dev",
      customMaps: {
        "/sample": {
          loc: "/sample",
          lastmod: "2024-04-27T07:44:43.422Z",
          priority: "0.7",
          changefreq: "always",
        },
      },
      defaultChangeFreq: "monthly",
      defaultPriority: "0.5",
    }),
  ],
});
```

## Configure

This plugin supports passing in an object configuration. The properties of this object configuration are as follows:

```ts
interface Options {
  domain?: string; // your domain
  customMaps?: CustomMaps; // custom your sitemap
  defaultPriority?: Priority; // defaultPriority 0.5
  defaultChangeFreq?: ChangeFreq; // defaultPriority monthly
}
```

- `domain` Customize your domain name
- `customMaps` Customize the sitemap for a specific path
- `defaultPriority` Setting default global priority
- `defaultChangeFreq` Setting default global changeFreq
