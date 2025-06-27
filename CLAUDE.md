# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quartz v4 Architecture Overview

Quartz is a TypeScript-based static site generator that transforms Markdown content into a fast, searchable website. It uses a plugin-based architecture with three main stages: Transformers (content processing), Filters (content selection), and Emitters (output generation).

### Core Architecture

The codebase follows a modular pipeline pattern:
1. **Content Processing**: Markdown files in `/content/` are parsed using the unified/remark ecosystem
2. **Plugin Pipeline**: Content flows through configurable transformers, filters, and emitters defined in `quartz.config.ts`
3. **Component Rendering**: Preact components in `/quartz/components/` handle page layouts and interactive elements
4. **Build Output**: Static HTML and assets are generated to `/public/`

Key architectural decisions:
- Preact for lightweight React-compatible components with SSR
- esbuild for fast TypeScript transpilation and bundling
- Worker threads for parallel content processing
- Dependency graph tracking for incremental builds

## Development Commands

```bash
# Core development
npm run quartz build     # Build static site
npm run quartz serve     # Development server with hot-reload
npm run quartz sync      # Build and push to GitHub
npm run quartz create    # Create new content

# Testing and validation
npm test                 # Run unit tests
npm run check           # TypeScript + Prettier checks
npm run format          # Auto-format code

# Documentation
npm run docs            # Build and serve docs locally
```

## Plugin Development

Plugins are the extension mechanism for Quartz. They're located in `/quartz/plugins/` and categorized as:

- **Transformers**: Modify content AST (e.g., `ObsidianFlavoredMarkdown`, `SyntaxHighlighting`)
- **Filters**: Control which content gets published (e.g., `RemoveDrafts`)
- **Emitters**: Generate output files (e.g., `ContentPage`, `RSS`)

When creating plugins:
- Transformers should export a `QuartzTransformerPlugin` with `htmlPlugins()` and/or `textPlugins()`
- Use the unified ecosystem (remark/rehype) for AST manipulation
- Add plugin options interfaces for configuration
- Register in `quartz.config.ts`

## Component Development

Components in `/quartz/components/` use Preact and can include:
- CSS via `.inline.scss` files (gets inlined)
- Client scripts via `beforeDOMLoaded` or `afterDOMLoaded` exports
- Static props for build-time data

Component patterns:
- Use `QuartzComponent` type for proper typing
- Access global data via `ctx.allSlugs`, `ctx.cfg`, etc.
- Support both SSR and client-side hydration
- Handle SPA navigation with proper cleanup

## Testing Approach

Tests use Node.js built-in test runner:
- Place test files as `*.test.ts` alongside source files
- Focus on unit testing utilities and core logic
- Run specific tests: `npm test -- --test-name-pattern="pattern"`
- Key test areas: path utilities, dependency graphs, plugin transforms

## Configuration System

Main configuration points:
- `quartz.config.ts`: Site configuration, theme, and plugin selection
- `quartz.layout.ts`: Page layout definitions for different page types
- Component-specific options passed through plugin configurations

When modifying configuration:
- Preserve type safety with proper interfaces
- Consider i18n implications (24 language support)
- Test with both SPA and non-SPA modes