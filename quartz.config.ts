import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "🌱 Josh's Digital Garden",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "quartz-topaz.vercel.app",
    ignorePatterns: ["private", "templates", ".obsidian", "content-backup", "docs", "**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.pdf", "**/Pasted*", "**/IMG_*", "**/Screenshot*", "**/*.zip", "**/*.mov", "**/*.mp4"],
    defaultDateType: "created",
    generateSocialImages: false,
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Inter",
        body: "Inter",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#FDF9F3",        // Warm cream background
          lightgray: "#F0E6D6",    // Soft beige for borders/dividers  
          gray: "#B5A690",         // Muted brown for subtle text
          darkgray: "#5D5347",     // Darker brown for secondary text
          dark: "#2A2A2A",         // Charcoal for main text
          secondary: "#C17B3B",    // Warm orange for links
          tertiary: "#9BB89A",     // Sage green for accents
          highlight: "rgba(232, 184, 76, 0.15)",  // Golden yellow highlight
          textHighlight: "#E8B84C88",             // Golden yellow text highlight
        },
        darkMode: {
          light: "#1C1B18",        // Deep warm brown background
          lightgray: "#2F2D27",    // Dark warm gray
          gray: "#6B6356",         // Medium warm brown
          darkgray: "#B5A690",     // Light warm brown for text
          dark: "#F0E6D6",         // Cream for main text
          secondary: "#E8B84C",    // Golden yellow for dark mode links
          tertiary: "#9BB89A",     // Sage green (same as light mode)
          highlight: "rgba(193, 123, 59, 0.15)",  // Warm orange highlight
          textHighlight: "#C17B3B88",             // Orange text highlight
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: false,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
