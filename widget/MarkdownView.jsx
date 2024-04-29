const Wrapper = styled.div`
  p {
    white-space: pre-line; // This ensures text breaks to new line
    span {
      white-space: normal; // and this ensures profile links look normal
    }
  }
  blockquote {
    margin: 1em 0;
    padding-left: 1.5em;
    border-left: 4px solid #ccc;
    color: #666;
    font-style: italic;
    font-size: inherit;
  }
  pre {
    background-color: #f4f4f4;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 1em;
    overflow-x: auto;
    font-family: "Courier New", Courier, monospace;
  }
`;
const Embedded = styled.span`
  white-space: normal;
  p {
    white-space: normal;
  }
`;
function MarkdownViewer(props) {
  const onLink = (props) => {
    if (props.children[0] === "EMBED") {
      return <Widget src="mob.near/widget/N.Embed" loading="" props={props} />;
    } else {
      return <a {...props} />;
    }
  };
  const renderMention =
    props.renderMention ??
    ((accountId) => (
      <span key={accountId} className="d-inline-flex" style={{ fontWeight: 500 }}>
        <Widget
          src="mob.near/widget/ProfileLine"
          props={{
            accountId: accountId.toLowerCase(),
            hideAccountId: true,
            tooltip: true,
          }}
        />
      </span>
    ));
  return (
    <Wrapper>
      <Widget
        key="content"
        loading={<div className="w-100" style={{ height: "100px" }} />}
        src="mob.near/widget/N.SocialMarkdown"
        props={{
          text: props.value,
          onLink: onLink,
          onMention: renderMention,
        }}
      />
    </Wrapper>
  );
}
return { MarkdownViewer };
