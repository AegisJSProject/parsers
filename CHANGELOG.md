<!-- markdownlint-disable -->
# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [v0.1.0] - 2025-10-23

### Changed
- Update to latest spec/`@aegisjsproject/santizer`

## [v0.0.16] - 2024-11-26

### Changed
- Update `@aegisjsproject/url`
- Add `sync` option when creating CSS parsers (controls use of `sheet.replace` vs `sheet.replaceSync`)

## [v0.0.15] - 2024-11-09

### Added
- Add unsafe versions of `html` and `doc` using `setHTMLUnsafe` and `parseHTMLUnsafe`

## [v0.0.14] - 2024-11-06

### Changed
- Update `@aegisjsproject/sanitizer` with support for Declarative Shadow DOM

## [0.0.13] - 2024-10-28

### Changed
- Use external `@aegijsproject/url` instead of own URL parser

### Fixed
- Cleanup unneeded files from published package

## [v0.0.12] - 2024-10-04

### Fixed
- Remove `console.log` that was left in for `css`

## [v0.0.11] - 2024-09-29

### Added
- Custom `stringy` for CSS (including `blob:` URIs for `File`s & `Blob`s)

### Changed
- CSS parser now uses `replace` instead of `replaceSync` (still works synchronously)

## [v0.0.10] - 2024-09-25

### Added
- Add `url` parser
- Add new types supported in `stringify`

### Fixed
- Fix infinite recursion in config via update to `@aegisjsproject/sanitizer`

## [v0.0.9] - 2024-09-19

### Changed
- Update dependenceis and config

## [v0.0.8] - 2024-04-09

### Changed
- Update ESLint version & config
- Update Super Linter version & config
- Update to latest `@aegisjsproject/sanitizer`

## [v0.0.7] - 2024-04-03

### Changed
- Update Sanitizer config

## [v0.0.6] - 2024-04-02

### Fixed
- Update `@aegisjsproject/sanitizer` with fix for `Object.groupBy`

## [v0.0.5] - 2024-04-01

### Fixed
- Update `@aegisjsproject/sanitizer` (Fixes possible exploit)

## [v0.0.4] - 2024-03-30

### Added
- Add functions to easily add/set stylesheets
- Add option to set custom stringify/map function in HTML parsers
- Add web component example in README

## [v0.0.3] - 2024-03-29

### Added
- Add support for parsing HTML Documents using `Document.parseHTML()`
- Add function to parse just a single HTML Element
- Add support in HTML parser for working with arrays and `NodeList`s, etc

### Changed
- Update README

## [Unreleased]

## [v0.0.2] - 2024-03-28

### Fixed
- Do not ignore minified scripts or sourcemaps when publishing

## [v0.0.1] - 2024-03-28

Initial Release
