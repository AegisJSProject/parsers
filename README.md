# `@aegisjsproject/parsers`

A collection of secure & minimal parsers for HTML, CSS, SVG, MathML, XML, and JSON

[![CodeQL](https://github.com/AegisJSProject/parsers/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/AegisJSProject/parsers/actions/workflows/codeql-analysis.yml)
![Node CI](https://github.com/AegisJSProject/parsers/workflows/Node%20CI/badge.svg)
![Lint Code Base](https://github.com/AegisJSProject/parsers/workflows/Lint%20Code%20Base/badge.svg)

[![GitHub license](https://img.shields.io/github/license/AegisJSProject/parsers.svg)](https://github.com/AegisJSProject/parsers/blob/master/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/AegisJSProject/parsers.svg)](https://github.com/AegisJSProject/parsers/commits/master)
[![GitHub release](https://img.shields.io/github/release/AegisJSProject/parsers?logo=github)](https://github.com/AegisJSProject/parsers/releases)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/shgysk8zer0?logo=github)](https://github.com/sponsors/shgysk8zer0)

[![npm](https://img.shields.io/npm/v/@aegisjsproject/parsers)](https://www.npmjs.com/package/@aegisjsproject/parsers)
![node-current](https://img.shields.io/node/v/@aegisjsproject/parsers)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/%40aegisjsproject%2Fparsers)
[![npm](https://img.shields.io/npm/dw/@aegisjsproject/parsers?logo=npm)](https://www.npmjs.com/package/@aegisjsproject/parsers)

[![GitHub followers](https://img.shields.io/github/followers/AegisJSProject.svg?style=social)](https://github.com/AegisJSProject)
![GitHub forks](https://img.shields.io/github/forks/AegisJSProject/parsers.svg?style=social)
![GitHub stars](https://img.shields.io/github/stars/AegisJSProject/parsers.svg?style=social)
[![Twitter Follow](https://img.shields.io/twitter/follow/shgysk8zer0.svg?style=social)](https://twitter.com/shgysk8zer0)

[![Donate using Liberapay](https://img.shields.io/liberapay/receives/shgysk8zer0.svg?logo=liberapay)](https://liberapay.com/shgysk8zer0/donate "Donate using Liberapay")
- - -

- [Code of Conduct](./.github/CODE_OF_CONDUCT.md)
- [Contributing](./.github/CONTRIBUTING.md)
<!-- - [Security Policy](./.github/SECURITY.md) -->

## What is This?
This is a lightweight (as little as 6.3Kb, minified and gzipped) library for parsing
various kinds of content using [tagged template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates).

It makes creating UI components, icons, and stylesheets easy, more secure, and
reusable. No framework required, though it should be compatible with any
client-side framework (no SSR - unless a full DOM implementation is provided).

It also sanitizes inputs to protect against XSS attacks, much like DOMPuriy. It
provides a safer alternative to `innerHTML` and using `<style>`s and protects
against XSS attacks by removing dangerous elements and attributes, and even
filtering out dangerous links such as `javascript:` URIs.

> [!IMPORTANT]
> While this library, the Sanitizer polyfill, and eventually the Sanitizer API
> built into browsers do aim to reduce the risks involved in creating things on
> the web, it should not be assumed that it makes your site immune.

## A Quick Example

```js
import { html, css, svg } from '@aegisjsproject/parsers';

export const btnStyles = css`.btn {
  background-color: #8cb4ff;
  color: #fafafa;
  border-radius: 6px;
}`;

export const closeIcon = svg`<svg width="12" height="16" viewBox="0 0 12 16" fill="currentColor">
  <path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"/>
</svg>`;

export const someBtn = html`<button class="btn" popovertarget="popover">Click Me!</button>`;

export const popover = html`<div id="popover" popover="auto">
  <button type="button" popovertarget="popover" popovertargetaction="hide">${closeIcon}</button>
  <p>Bacon ipsum dolor amet pastrami sirloin kielbasa tenderloin.</p>
</div>`;
```

> [!WARNING]
> The Sanitizer API is still being developed, and could change. Until the API
> is stable, this project will remain pre-v1.0.0

## Overview of the Parsers

### `html`
This uses the Sanitizer API with a sanitizer config allowing HTML & SVG by default.
It returns a [`DocumentFragment`](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment),
allowing for parsing of multiple elements without requiring a container element
to wrap everything.

It will strip out dangerous elements such as `<script>`, attributes such as `onclick`,
and will also remove any `javascript:` or `file:` URI attributes for certain link-type
attributes such as `href`.

### `css`
This uses [Constructable StyleSheets](https://web.dev/articles/constructable-stylesheets)
and returns a [`CSSStyleSheet`](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet),
which may be used via `documentOrShadow.adoptedStyleSheets`.

### `svg`
This uses `Document.parseHTML()` with a sanitizer config allowing SVG elements
and attributes, using the correct namespaces. It returns an [`SVGSVGElement`](https://developer.mozilla.org/en-US/docs/Web/API/SVGSVGElement).

### `math`
This uses `Document.parseHTML()` with a sanitizer config allowing MathML elements
and attributes, using the correct namespaces. It returns an [`MathMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement).

## `xml`
This is just a simple wrapper function using `new DOMParser().parseFromString(str, { type: 'application/xml' })`.
It does not provide any additional security, only a more convenient way of parsing XML.

## `json`
This is also just a convenient wrapper that provides no security benefits. It
just calls `JSON.parse()`.

- - -
> [!TIP]
> Reusing Parsed HTML, SVG, & MathML

Be aware that the usual rules of appending nodes applies to the `DocumentFragment`s
and `Element`s that are returned. This means that, if you append them in multiple
places, they will only be moved instead of copied. If you need to append more than
once, you will have to use [`node.cloneNode(true)`](https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode).

This does not apply to `CSSStyleSheets` since [`adoptedStyleSheets`](https://developer.mozilla.org/en-US/docs/Web/API/Document/adoptedStyleSheets)
allows sharing, so cloning is not necessary.

## About [The Sanitizer API](https://github.com/WICG/sanitizer-api/)
This project relies on [`@aegisjsproject/sanitizer`](https://github.com/AegisJSProject/sanitizer/)
to provide `Element.prototype.setHTML()` & `Document.parseHTML()`. While it is
included as a dependency, the polyfill is not loaded by default, except for in `bundle.js`
and `bundle.min.js`. This is to avoid bloating bundles with multiple copies, as
well as to allow loading any different polyfill should you choose.

When not using the bundle, it is best to import the polyfill as a separate `<script>`:

```html
<!-- Note: The version and `integrity` are not necessarily current -->
<script referrerpolicy="no-referrer" crossorigin="anonymous" integrity="sha384-OUI/F1tbQMDz0u/Yf2w+15JU5U5sQzji2Do4pFQIBI7Zc5B5j0LnOoOjA4HpBCwp" src="https://unpkg.com/@aegisjsproject/sanitizer@0.0.7/polyfill.min.js" fetchpriority="high" defer=""></script>
```

However, you may also include it in your modules should you choose:

```js
// ES Module with importmap
import '@aegisjsproject/sanitizer/polyfill.min.js';

// ES Module with full URL
import 'https://unpkg.com/@aegisjsproject/sanitizer@0.0.7/polyfill.min.js';

// CommonJS
require('@aegisjsproject/sanitizer/polyfill');
```

## Use as ES Module with [importmap](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap)
Please be aware that `<script type="importmap">` falls under `script-src` in
[Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src).
As such, if you use CSP and do not allow `'unsafe-inline'`, you will need to add
a `nonce="examplerandomstring"` on it and add `'nonce-examplerandomstring'` to `script-src`.
Or, you could use a hash/`integrity`/SRI, but be aware that it will be invalid if
a single character changes.

```html
<script type="importmap">
  {
    "imports": {
      "@aegisjsproject/parsers": "https://unpkg.com/@aegisjsproject/parsers[@:version]",
      "@aegisjsproject/parsers/": "https://unpkg.com/@aegisjsproject[@:version]/parsers/",
      "@aegisjsproject/sanitizer": "https://unpkg.com/@aegisjsproject/sanitizer@0.0.7/polyfill.min.js",
      "@aegisjsproject/sanitizer/": "https://unpkg.com/@aegisjsproject/sanitizer@0.0.7/"
    }
  }
</script>
```

## Basic Usage
```js
import { html, css, svg } from '@aegisjsproject/parsers';

const icon = svg`<svg viewBox="0 0 10 10" height="18" width="18" class="icon" fill="currentColor">
  <rect x="0" y="0" height="10" width="10" rx="1" ry="1" />
</svg>`

const styles = css`
  .foo {
    color: red;
  }
`;

const template = html`<div class="container" data-foo="bar">
  <h1>Hello, World!</h1>
</div>`;

document.body.append(template, icon);
document.adoptedStyleSheets = [styles];
```

## Importing Only What is Necessary (ES Modules Only)
```js
import { html } from '@aegisjsproject/html.js';
import { css } from '@aegisjsproject/css.js';
import { svg } from '@aegisjsproject/svg.js';
```

## Advanced Usage with Custom Sanitizer Config
```js
import { createHTMLParser } from '@aegisjsproject/parsers/html.js';
import { createCSSParser } from '@aegisjsproject/parsers/css.js';

const html = createHTMLParser({
  elements: ['span', 'div', 'p', 'a', 'pre', 'code', 'blockquote', 'b', 'i'],
  attributes: ['class', 'id', 'href'],
  comments: false,
});

const css = createCSSParser({
  media: '(prefers-color-scheme: dark)',
  disabled: false,
  baseURL: document.baseURI,
});
```

> [!IMPORTANT]
>  Via `npm i` and CommonJS/`require()`, only the main module is transpiled to
> CommonJS. You cannot `require()` specific scripts using CommonJS.

```js
// Load the polyfill
require('@aegisjsproject/sanitizer/polyfill');
const { html } = require('@aegisjsproject/parsers');
```

## Content-Security-Policy and [TrustedTypesPolicy](https://developer.mozilla.org/en-US/docs/Web/API/Trusted_Types_API)
If you are importing the module or bundle from `unpkg.com`, you will need to allow
that in your `script-src`. If you installed it locally, you should not need any
new sources allowed and, assuming no external scripts are used, can simply use `'self'`.

You will, however, require either a hash or nonce if you use an importmap, since
that is governed by `script-src` and would be considered `'unsafe-inline'`, and 
it cannot be external - it **MUST** be an inline-script.

If you use Trusted Types, however, you will at minimum need to allow `aegis-sanitizer#html`,
as this policy is used internally for parsing the raw strings. In the future,
a polyfill for the Trusted Types API will also be provided, and that will require
`empty#html` and `empty#script` for `trustedTypes.emptyHTML` and `trustedTypes.emptyScript`
respectively.

A full CSP might look like this:

```
default-src 'none';
script-src 'self' https://unpkg.com/@aegisjsproject/ 'sha384-qOnpoDjAcZtXfanBdq59LK71K0lxdJmnLrSCdgYcsxL4PrFIFIpw79PfBnEwlm+M';
style-src 'self';
font-src 'self';
img-src 'self';
connect-src 'self';
trusted-types empty#html empty#script aegis-sanitizer#html;
require-trusted-types-for 'script';
```
