# bos-workspace

🕰️ **Legacy `bos-workspace` users can use the [migration guide](https://github.com/NEARBuilders/bos-workspace/blob/main/MIGRATION_GUIDE.md) to upgrade or read the legacy documentation for v0.0.1-alpha.6 [here](https://github.com/NEARBuilders/bos-workspace/tree/version/0.0.1-alpha.6).**

`bos-workspace` is a comprehensive toolset designed to simplify the development and deployment of [NEAR components](https://docs.near.org/bos/tutorial/quickstart) and applications. With support for hot reload, TypeScript, and multiple app management, it caters to developers looking for an efficient and scalable development environment.

## Quickstart

### Installation

You can install `bos-workspace` globally on your machine or within your existing project workspace using npm (or other package manager):

global install:
```js
npm -g install bos-workspace
```
or navigate to your project directory and install:
```js
npm install bos-workspace
```
To verify `bos-workspace` in installed, you can check for a current version:
```js
bos-workspace -V
```
![Verify `bos-workspace` version](verify_bosworkspace_version.png)

### Usage
To start, you may clone an existing project by navigating to your project directory and running the `clone` command:
```js
bos-workspace clone [accountId]
```
where `accountId ` is your named NEAR account (yourname.near)

To build a workspace from scratch 
### Commands
