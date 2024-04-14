const { basePath, param, _params } = props;

let adapter = "${config_account}/widget/utils.adapter"; // this could come from props

const { MarkdownViewer } = VM.require("${alias_devs}/widget/markdown.view");

const Template = VM.require("${config_account}/widget/PR.Template");

const { get } = VM.require(adapter);

const data = get(_params);

if (!data) { // this could be a part of the template
  return <p>Page not found</p>;
}

return (
  <Template theme={{ "--main-bg-color": "green" }}>
    <div style={{ backgroundColor: "var(--main-bg-color)" }}>
      <MarkdownViewer value={data} />
    </div>
  </Template>
);
