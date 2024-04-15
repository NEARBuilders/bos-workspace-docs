# bos-workspace-docs

This repository holds the bos-workspace docs and a customizable documentation site.

## Getting started

1. Install packages

```cmd
yarn install
```

2. Start dev environment

```cmd
yarn run dev
```

This will start a gateway at [127.0.0.1:8080](http://127.0.0.1:8080) which will render your local widgets. The entry point for this app is [docs.bos-workspace.testnet/widget/index](http://127.0.0.1:8080/docs.bos-workspace.testnet/widget/index)

## Adding documents

Currently, the process is:

1. Write your document in the [/md](./md/) directory
2. Add the reference in [utils/db](./widget/utils/db.js), this will get picked up by the sidebar
3. Confirm section/subsection matches path after `/md`
4. Push to branch (configure branch in [github adapter](./widget/PR/adapter/github.jsx)) to see updates. 

Let's build better!
