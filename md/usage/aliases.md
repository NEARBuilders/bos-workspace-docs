# aliases

## Account

The main acount in `bos.config.json`, can be replaced via `overrides`.

pattern: `{CONFIG_ACCOUNT}`

## Overrides

Aliases from bos.config.json are used to replace comments with correct values, useful for widget sources.

Pattern: `${ALIAS_KEY}`

```json
{
  "account": "[MAINNET_ACCOUNT_ID]",
  "aliases": ["./aliases.mainnet.json"],
  "overrides": {
    "testnet": {
      "account": "[TESTNET_ACCOUNT_ID]",
      "aliases": ["./aliases.testnet.json"]
    }
  }
}
```

with the jsons:

`aliases.mainnet.json`

```json
{
  "devs": "devs.near"
}
```

`aliases.testnet.json`

```json
{
  "devs": "neardevs.testnet"
}
```

Replace all account and contract references with their network alternatives. If alternatives do not exist, we can add to [mainnet-on-testnet](https://github.com/NEARBuilders/mainnet-on-testnet)