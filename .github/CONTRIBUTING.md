# Contributing to the project

Due to Content-Security-Policy, use of `eval` and inline scripts are **prohibited**.
Further, this project uses [native JavaScript modules](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/),
so be sure to familiarize yourself with the syntax. It also uses [classes](https://hacks.mozilla.org/2015/07/es6-in-depth-classes/)
and many other [ES6](https://hacks.mozilla.org/category/es6-in-depth/) features,
so you should be familiar with them.

## Issues
`ISSUE_TEMPALTE.md` will be used to pre-fill any issues created. Logs and detailed
descriptions are extremely helpful and may be required. **DO NOT** report any
issues relating to browser compatibility. Only modern browsers are supported, and
it is your responsibility to deal with vendor prefixes and polyfills. The included
polyfills are deprecated and will be moved to another repository. I suggest that
you look into [Polyfill.io](https://polyfill.io).

## Pull requests
Please use an open issue and reference that issue in the pull request, as suggested
in `PULL_REQUEST_TEMPLATE.md` (will be pre-filled when opening a pull request).
When you open a pull request, it **MUST** pass test/linting or it cannot be merged.

It is also suggested that you label your branches according to the issue and label,
so a bug reported in issue 14 becomes a branch named `bug/14` and a feature requested
in issue 42 becomes `feature/42`. Do not work directly on master branch, as your
pull request may not end up being accepted, causing your fork to divert.

## Testing
All JavaScript **MUST** pass Eslint according to the rules defined in `.eslintrc`
and have an extension of `.js`. Tests are run using either `eslint` command directly
or by running `npm test`.

### Linting rules
- Single quotes
- Semicolons required
- Indent using tabs (align using spaces)
- No `require` function. This uses native modules only

> Tabs require fewer characters and can be adjusted by altering tab width. A developer
> can increase/decrease indentation just by altering tab width, without making
> any changes to the code itself. Since spaces are still to be used for alignment,
> I see zero benefit to using 2 or 4 space characters instead of a single tab.

Since this project minifies and packages all JavaScript using Babel & Webpack,
all script **MUST NOT** execute any code, but only import/export functions,
classes, etc. Modules which do not export anything, however, are the only exception
to this rule.

The simple rule is: if it exports, it **MUST NOT** have side effects. If it has
side effects, it **MUST NOT** export.
