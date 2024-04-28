# bos-workspace

🕰️ **Legacy `bos-workspace` users can use the [migration guide](https://github.com/NEARBuilders/bos-workspace/blob/main/MIGRATION_GUIDE.md) to upgrade or read the legacy documentation for v0.0.1-alpha.6 [here](https://github.com/NEARBuilders/bos-workspace/tree/version/0.0.1-alpha.6).**

🧰 `bos-workspace` is a comprehensive toolset designed to simplify the development and deployment of [NEAR components](https://docs.near.org/bos/tutorial/quickstart) and applications. With support for hot reload, TypeScript, and multiple app management, it caters to developers looking for an efficient and scalable development environment.

## Quickstart 🏃🏾

### Installation 🏗️

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
bos - workspace - V;
```

<img src="verify_bosworkspace_version.png" alt="Verify `bos-workspace` version" width="100%">

To start, you may clone an existing project by navigating to your project directory and running the `clone` command:

```js
bos-workspace clone [accountId]
```

where `accountId ` is your named NEAR account (yourname.near)

<img src="cloned_components.png" alt="Cloned BOS components" width="90%">

In the terminal, navigate to the account name workspace, then run `bos-workspace-dev` to start the development server.

The image below is an example of what your terminal and browser should look like once you've opened the local gateway.

<img src="dev_server_running.png" alt="Development server running" width="90%">

### Usage 👷🏽‍♀️

You can use your `bos-workspace` for both single and multi app development by taking advantage of the relationship between `Apps` and `Workspaces`

**App:** 🛠️

- belongs to an Account
- described by a `bos.config.json` where the content is:

```js
{
    "account": "app.near"
}
```

- path to code: `{projectId}/widget/*`
- cloning: `bos-workspace clone {accountId}` to create an App with `bos.config.json` set up and pull in all of the widgets from that `accountId`
  <br><br>

_Sample directory structure_

<img src="sample_app_structure.png" alt="sample app structure" width="75%">
<br><br>

**Workspace:** 🛠️

- able to hold multiple Apps at the same time (similar to a monrepo)
- described by a `bos.workspace.json` where the content is:

```js
{
    "apps": ["/apps/*"]
}
```

<br>
*Sample directory structure*

<img src="sample_workspace_structure.png" width="75%">
<br><br>

📝 **Note:** App names are not required to end in `.near` or be stored in a directory named `/apps`. Be sure your `bos.config.json` is located at the same level as directories like `/widget` and your `bos.workspace.json` reflects the name of the directory where your apps are located

### Commands 🤖

To see the list of commands, run `bw` or `bos-workspace`

📝 **Note:** `bos-workspace help [command]` will return additional information about any of the commands listed here

Usage: `bos-workspace [options] [command]`

Build decentralized apps

Options: <br>
`-V`, --version<br>
`-h`, --help

Commands:

<details>
<summary><code>dev [options] [src]</code> Run the development server</summary>
<br>
Usage: <code>bos-workspace dev [options] [src]</code><br><br>

Arguments: <br>
<code>src</code>: Path to the app source code (default: ".")
<br><br>
Options:<br>
<code>-p, --port `<port>` </code> Port to run the server on (default: "8080")<br>
<code>-g, --gateway `<gateway>`</code> Path to custom gateway dist<br>
<code>--no-gateway</code> Disable the gateway<br>
<code>--no-hot</code> Disable hot reloading<br>
<code>--no-open</code> Disable opening the browser<br>
<code>-h, --help</code>Display help for command<br>

</details>
<br>
<details>
<summary><code>build [options] [src] [dest]</code> Build the project</summary>
<br>
Usage: <code>bos-workspace build [options] [src] [dest]</code><br><br>

Arguments: <br>
<code>src</code>: Path to the app source code (default: ".")
<code>dest</code>: Destination path
<br><br>
Options:<br>
<code>-n, --network `<network>` </code>Network<br>
<code>-l, --loglevel `<loglevel>`</code>log level (ERROR, WARN, INFO, DEV, BUILD, DEBUG) (default: "BUILD")
<br>
<code>-h, --help</code>Display help for command<br>

</details>
<br>

<details>
<summary><code>workspace|ws [options] [command] [src] [dest]</code> Work with multiple apps</summary>
<br>
Usage: <code>workspace|ws [options] [command] [src] [dest]</code><br><br>

Arguments: <br>
<code>command</code>: command to run<br>
<code>src</code>: Path to the workspace (default: ".")<br>
<code>dest</code>: Destination path
<br><br>
Options:<br>
<code>-n, --network `<network>` </code>Network<br>
<code>-l, --loglevel `<loglevel>`</code>log level (ERROR, WARN, INFO, DEV, BUILD, DEBUG) (default: "BUILD")
<br>
<code>-p, --port `<port>` </code> Port to run the server on (default: "8080")<br>
<code>-g, --gateway `<gateway>`</code> Path to custom gateway dist<br>
<code>--no-gateway</code> Disable the gateway<br>
<code>--no-hot</code> Disable hot reloading<br>
<code>--no-open</code> Disable opening the browser<br>
<code>-h, --help</code>Display help for command<br>

</details>
<br>
<details>
<summary><code>init [options] [path]</code> Initialize a new project</summary>
<br>
Usage: <code>bos-workspace init [options] [path]
</code><br><br>

Arguments: <br>
<code>path</code>: where to init the project<br>

Options:<br>
<code>-t, --template `<template>` </code>template to use (js-single, js-multi) (default: "js-single")
<br>
<code>-h, --help</code>Display help for command<br>

</details>
<br>
<details>
<summary><code>clone [account] [dest]</code> Clone a SocialDB repository</summary>
<br>
Usage: <code>bos-workspace clone [account] [dest]
</code><br><br>

Arguments: <br>
<code>account</code>: accountId<br>
<code>dest</code>: destination path

Options:<br>
<code>-h, --help</code>Display help for command<br>

</details>
<br>
<details>
<summary><code>pull [account]</code> Pull updates from a SocialDB repository</summary>
<br>
Usage: <code>bos-workspace pull [account]</code><br><br>

Arguments: <br>
<code>account</code>: accountId<br>

Options:<br>
<code>-h, --help</code>Display help for command<br>

</details>
