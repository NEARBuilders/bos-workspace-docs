# Usage 👷🏽‍♀️

You can use your `bos-workspace` for both single and multi app development by taking advantage of the relationship between `Apps` and `Workspaces`

**App:** 🛠️
- belongs to an Account
- described by a `bos.config.json` where the content is:
```
{
    "account": "app.near"
}
```

- path to code: `{projectId}/widget/*`
- cloning: `bos-workspace clone {accountId}` to create an App with `bos.config.json` set up and pull in all of the widgets from that `accountId`
<br><br>

*Sample directory structure*

<img src="sample_app_structure.png" alt="sample app structure" width="75%">
<br><br>

**Workspace:**  🛠️
- able to hold multiple Apps at the same time (similar to a monrepo) 
- described by a `bos.workspace.json` where the content is:
```
{
    "apps": ["/apps/*"]
}
```
<br>
*Sample directory structure*

<img src="sample_workspace_structure.png" width="75%">
<br><br>

📝  **Note:** App names are not required to end in `.near` or be stored in a directory named `/apps`. Be sure your `bos.config.json` is located at the same level as directories like `/widget` and your `bos.workspace.json` reflects the name of the directory where your apps are located