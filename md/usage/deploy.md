# Deploy

command: `deploy`

Deploy an app in the workspace

## Usage (CLI)

Deploy the project with the option to specify an app name (must be name of the folder in /apps directory):

```cmd
bos-workspace deploy [app name]
```

[lib/deploy.ts](https://github.com/NEARBuilders/bos-workspace/blob/main/lib/deploy.ts)
// TODO: embed github code block @hyperfiles.near

[UNDER CONSTRUCTION]
[TASK: Implement deploy command](https://github.com/NEARBuilders/bos-workspace/issues/77)
@ittechhunter.near
@bos-workspace.near

## Configuring environments

### Prerequisites

1. Must be upgraded to bos-workspace v1, see the [migration guide](?page=getting_started/migration_guide)
2. Specify testnet [overrides + aliases](?page=usage/aliases) in bos.config.json.


### Mainnet

1. Create `.github/workflow/release-mainnet.yml`

```yml
name: Deploy Components to Mainnet
on:
  push:
    branches: [main]
jobs:
  deploy-mainnet:
    uses: NEARBuilders/bos-workspace/.github/workflows/deploy.yml@main
    with:
      bw-legacy: false
      deploy-env: "mainnet"
      app-name: "[APP_NAME]"
      deploy-account-address: "[DEPLOY_ACCOUNT]"
      signer-account-address: "[DEPLOY_ACCOUNT]"
      signer-public-key: [PUBLIC_KEY]
    secrets:
      SIGNER_PRIVATE_KEY: ${{ secrets.SIGNER_PRIVATE_KEY }} // then configure this in your Github/Settings/Actions
```

### Testnet

1. Create `.github/workflow/release-testnet.yml`

```yml
name: Deploy Components to Testnet
on:
  push:
    branches: [develop]
jobs:
  deploy-mainnet:
    uses: NEARBuilders/bos-workspace/.github/workflows/deploy.yml@main
    with:
      bw-legacy: false
      build-env: "testnet"
      deploy-env: "testnet"
      app-name: "[APP_NAME]"
      deploy-account-address: "[DEPLOY_ACCOUNT]" // testnet account
      signer-account-address: "[DEPLOY_ACCOUNT]"
      signer-public-key: [PUBLIC_KEY] 
    secrets:
      SIGNER_PRIVATE_KEY: ${{ secrets.SIGNER_PRIVATE_KEY }} // then configure this in your Github/Settings/Actions
```


Reference: [quickstart](https://github.com/nearbuilders/quickstart)
