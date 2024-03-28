# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Setup to transpile all `./*.js` to `./cjs/*.cjs` (except `*.config.js`)
- Update `exports` and `main` accordingly

## [v1.1.1] - 2023-09-24

### Added
- Add `unpkg` to `package.json`
- Add badges in README

### Changed
- Update `exports` to `package.json` to handle wider variety

### Fixed
- Fix typo in `fix:js` script

### [v1.1.0] - 2023-07-03

### Changed
- Update to node 20
- Update npm publishing GH Action

## [v1.0.5] - 2023-07-02

### Added
- Add `funding`

### Changed
- Updated GitHub Actions workflows 
- Update versioning & lock-file scripts
- Update `.npmignore` & `.gitignore`

## [v1.0.4] - 2023-06-08

### Added
- Install `@shgysk8zer0/npm-utils`
- Add `exports` to package config

### Removed
- Uninstall `rollup`, `eslint`

### Changed
- Use `getConfig()` from `@shgysk8zer0/js-utils/rollup` for rollup config

## [v1.0.3] - 2023-06-01

### Fixed
- Revert to old Release Action, now with permissions & link to changelog

## [v1.0.2] - 2023-06-01

### Fixed
- Fix `changelog-entry` to match `[$version]` instead of `$version`

## [v1.0.1] - 2023-05-31

### Fixed
- Update GitHub Release workflow to use [Auto Release](https://github.com/marketplace/actions/auto-release)

## [v1.0.0] - 2023-05-31

Initial Release
