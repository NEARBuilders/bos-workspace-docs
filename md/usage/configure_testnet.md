# Configure Testnet

1. upgrade to bos-workspace v1, [MIGRATION_GUIDE](?page=migration_guide.md)
2. create testnet override + aliases in bos.config.json
3. replace sdks.near with ${config_account} and any other alias with ${alias_devs}
4. configure testnet release workflow in github

Reference: [quickstart](https://github.com/nearbuilders/quickstart)
