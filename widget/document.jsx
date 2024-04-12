const { basePath, param, _params } = props;

let adapter = "${config_account}/widget/PR.adapter.github"; // this could come from props

const { MarkdownViewer } = VM.require("${alias_devs}/widget/markdown.view") || {
  MarkdownViewer: () => null,
};

const { get } = VM.require(adapter);

const data = get(_params.path); // this uses our adapter

if (!data) {
  return <p>Page not found</p>;
}

return (
  <div className="content">
    <MarkdownViewer value={data} />
  </div>
);
