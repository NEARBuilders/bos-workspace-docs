const { basePath, param, _params } = props;

let adapter = "${config_account}/widget/utils.db"; // this could come from props

const Template = VM.require("${config_account}/widget/PR.Template") || {
  Template: () => <></>,
};

console.log("PARAMS", _params);

const { get } = VM.require(adapter) || {
  get: () => {},
};

const data = get(_params);

if (!data) {
  // this could be a part of the template
  return <p>Page not found</p>;
}

const { MarkdownViewer } = VM.require("${config_account}/widget/MarkdownView") || {
  MarkdownViewer: () => null,
};

return (
  <Template theme={{ "--main-bg-color": "white" }} style={{}}>
    <div
      style={{ backgroundColor: "var(--main-bg-color)", width: "100%", height: "100%" }}
      className="content"
    >
      <MarkdownViewer value={data} />
    </div>
  </Template>
);
