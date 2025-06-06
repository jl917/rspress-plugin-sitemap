import type { RspressPlugin } from "@rspress/shared";
import { statSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

type ChangeFreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

type Priority = "0.0" | "0.1" | "0.2" | "0.3" | "0.4" | "0.5" | "0.6" | "0.7" | "0.8" | "0.9" | "1.0";

interface Sitemap {
  loc: string;
  lastmod?: string;
  changefreq?: ChangeFreq;
  priority?: Priority;
}

interface CustomMaps {
  [prop: string]: Sitemap;
}

interface Options {
  domain?: string;
  customMaps?: CustomMaps;
  defaultPriority?: Priority;
  defaultChangeFreq?: ChangeFreq;
}

const generateNode = (sitemap: Sitemap): string => {
  let result = "<url>";
  for (const [tag, value] of Object.entries(sitemap)) {
    result += `<${tag}>${value}</${tag}>`;
  }
  result += "</url>";
  return result;
};

const generateXml = (sitemaps: Sitemap[]) => {
  console.log(`Generate sitemap.xml for ${sitemaps.length} pages.`);
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemaps.reduce(
    (node, sitemap) => node + generateNode(sitemap),
    ""
  )}</urlset>`;
};

export default function rspressPluginSitemap(options: Options): RspressPlugin {
  options = {
    domain: "https://rspress.dev",
    customMaps: {},
    defaultChangeFreq: "monthly",
    defaultPriority: "0.5",
    ...options,
  };
  let sitemaps: Sitemap[] = [];
  let set = new Set();
  return {
    name: "rspress-plugin-sitemap",
    config(config) {
      return config;
    },
    extendPageData(pageData, isProd) {
      if (isProd) {
        if (!set.has(pageData.id)) {
          set.add(pageData.id);
          sitemaps.push({
            loc: `${options.domain}${pageData.routePath}`,
            lastmod: statSync(pageData._filepath).mtime.toISOString(),
            priority: pageData.routePath === "/" ? "1.0" : options.defaultPriority,
            changefreq: options.defaultChangeFreq,
            ...((options.customMaps && options.customMaps[pageData.routePath]) || {}),
          });
        }
      }
    },
    afterBuild(config, isProd) {
      if (isProd) {
        const outputPath = `./${
          config.outDir || config.builderConfig?.output?.distPath?.root || "doc_build"
        }/sitemap.xml`;
        // 确保目录存在
        mkdirSync(dirname(outputPath), { recursive: true });
        writeFileSync(outputPath, generateXml(sitemaps));
      }
    },
  };
}
