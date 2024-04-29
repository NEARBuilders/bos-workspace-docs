const { MarkdownViewer } = VM.require("${config_account}/widget/MarkdownView") || {
  MarkdownViewer: () => null,
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  border-bottom: 1px solid var(--stroke-color, rgba(154, 127, 127, 0.2));
  background: var(--bg-1, #fff);
  width: 100%;
  display: flex;
  padding: 24px 12px;
  gap: 16px;
  margin-bottom: 1rem;
  div {
    display: flex;
    gap: 1rem;
  }
`;

const EditorWrapper = styled.div`
  flex: 1;
  padding: 24px 12px;
`;

const EditorTextarea = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  font-size: 16px;
  resize: none;
  outline: none;
`;

const PreviewContent = styled.div`
  color: #333;
  font-size: 16px;
`;

const Label = styled.label`
  margin-right: 10px;
`;

const Button = styled.button`
  display: inline-flex;
  padding: 9px 16px 9px 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 6px;
  border: 1px solid #dee2e6;
  background: var(--Colors-Grey-SystemWhite, #fff);

  &:hover {
    box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.22) inset,
      0px -1px 0px 0px rgba(15, 15, 15, 0.15) inset, 0px 1px 2px -0.5px rgba(5, 5, 5, 0.08);
  }
  &:disabled {
    cursor: not-allowed;
  }
`;

const ModalBox = styled.div`
  background-color: white;
  min-width: 400px;
  max-width: 600px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 1003;
`;

const draftKey = "draft";

const set = (k, v) => {
  Storage.privateSet(k, v);
};

const get = (k) => {
  return Storage.privateGet(k);
};

const draft = get(draftKey);
const defaultViewMode = get("viewMode");
const defaultPreview = get("preview");
const defaultEditor = get("editor");
const defaultLanguage = get("language");
const defaultType = get("type");
const defaultPath = get("path");

if (
  draft === null ||
  viewMode === null ||
  defaultPreview === null ||
  defaultEditor === null ||
  defaultLanguage === null ||
  defaultType === null ||
  defaultPath === null
) {
  return "";
}

const [content, setContent] = useState(draft);
const [viewMode, setViewMode] = useState(defaultViewMode || "single"); // 'single' or 'split'
const [showPreview, setShowPreview] = useState(defaultPreview || false);
const [type, setType] = useState(defaultType || "");
const [editor, setEditor] = useState(defaultEditor || "");
const [language, setLanguage] = useState(defaultLanguage || "md");
const [path, setPath] = useState(defaultPath || "");

const handleToggleViewMode = () => {
  const newMode = viewMode === "single" ? "split" : "single";
  set("viewMode", newMode);
  setViewMode(newMode);
  set("preview", false);
  setShowPreview(false);
};

const handleTogglePreview = () => {
  set("preview", !showPreview);
  setShowPreview(!showPreview);
};

const editors = [
  {
    value: "",
    label: "default textarea",
  },
  {
    value: "${alias_devs}/widget/markdown.SimpleMDE",
    label: "SimpleMDE",
  },
  {
    value: "${alias_devs}/widget/markdown.MarkdownEditorIframe",
    label: "MarkdownEditorIframe",
  },
];

const languages = [
  {
    value: "md",
    label: "Markdown",
  },
  {
    value: "json",
    label: "JSON",
  },
];

const types = [
  {
    value: "document",
    label: "Document",
  },
];

const DefaultEditor = ({ value, onChange, onBlur }) => (
  <textarea
    style={{ height: "100%" }}
    className="form-control"
    placeholder="Start typing..."
    value={value}
    onChange={onChange}
    onBlur={onBlur}
  />
);

const PostModal = styled.div`
  div {
    display: grid;
  }
`;

return (
  <PageContainer>
    <Header>
      <div>
        {viewMode === "single" && (
          <Button onClick={handleTogglePreview}>
            {showPreview ? "Hide Preview" : "Show Preview"}
          </Button>
        )}
        <Button onClick={handleToggleViewMode}>Toggle View Mode</Button>
      </div>
      <PostModal>
        <Widget
          src="nui.sking.near/widget/Layout.Modal"
          props={{
            open: state.saveModalOpen,
            onOpenChange: (open) => {
              State.update({
                ...state,
                saveModalOpen: open,
              });
            },
            toggle: (
              <Button className="classic" disabled={!content}>
                <>
                  <i className={"bi bi-save"} />
                  Save
                </>
              </Button>
            ),
            content: (
              <div className="w-100">
                <ModalBox>
                  <Widget
                    src={"${alias_devs}/widget/modal.create"}
                    props={{
                      creatorId: context.accountId,
                      path: path,
                      setPath: (v) => {
                        setPath(v);
                        set("path", v);
                      },
                      data: JSON.stringify({ body: content }),
                      closeModal: () => {
                        State.update({
                          ...state,
                          saveModalOpen: false,
                        });
                      },
                    }}
                  />
                </ModalBox>
              </div>
            ),
          }}
        />
        <Widget
          src="nui.sking.near/widget/Layout.Modal"
          props={{
            open: state.postModalOpen,
            onOpenChange: (open) => {
              State.update({
                ...state,
                postModalOpen: open,
              });
            },
            toggle: (
              <Button className="classic" disabled={!path}>
                <>
                  <i className={"bi bi-send"} />
                  Post
                </>
              </Button>
            ),
            content: (
              <div className="w-100">
                <ModalBox>
                  <Widget
                    src={"${alias_devs}/widget/modal.post"}
                    props={{
                      creatorId: context.accountId,
                      path: path,
                      type: type,
                      closeModal: () => {
                        State.update({
                          ...state,
                          postModalOpen: false,
                        });
                      },
                    }}
                  />
                </ModalBox>
              </div>
            ),
          }}
        />
      </PostModal>
    </Header>
    <div className="row " style={{ marginLeft: "0px", marginRight: "0" }}>
      <div class="col-12 col-md-4 form-group">
        <label>Type</label>
        <select
          class="form-select"
          onChange={(e) => {
            set("type", e.target.value);
            setType(e.target.value);
          }}
        >
          {types &&
            types.map((it) => (
              <option value={it.value} selected={it.value === type}>
                {it.label}
              </option>
            ))}
        </select>
      </div>
      <div class="col-12 col-md-4 form-group">
        <label>Editor</label>
        <select
          class="form-select"
          onChange={(e) => {
            set("editor", e.target.value);
            setEditor(e.target.value);
          }}
        >
          {editors &&
            editors.map((it) => (
              <option value={it.value} selected={it.value === editor}>
                {it.label}
              </option>
            ))}
        </select>
      </div>
      <div class="col-12 col-md-4 form-group">
        <label>Language</label>
        <select
          class="form-select"
          onChange={(e) => {
            set("language", e.target.value);
            setLanguage(e.target.value);
          }}
        >
          {languages &&
            languages.map((it) => (
              <option value={it.value} selected={it.value === language}>
                {it.label}
              </option>
            ))}
        </select>
      </div>
    </div>
    {viewMode === "single" ? (
      <EditorWrapper key={editor}>
        {showPreview ? (
          <MarkdownViewer value={content} />
        ) : (
          <>
            {editor ? (
              <Widget
                src={editor}
                props={{
                  value: { content },
                  onChange: (v) => {
                    setContent(v);
                    set(draftKey, v);
                  },
                }}
              />
            ) : (
              <DefaultEditor
                value={content}
                onBlur={() => {
                  let v;
                  if (language === "json") {
                    v = JSON.stringify(JSON.parse(content), null, 2);
                    if (v !== "null") {
                      setContent(v);
                      set(draftKey, v);
                    }
                  }
                }}
                onChange={(e) => {
                  let v = e.target.value;
                  setContent(v);
                  Storage.privateSet(draftKey, v);
                }}
              />
            )}
          </>
        )}
      </EditorWrapper>
    ) : (
      <div style={{ display: "flex", height: "100%" }}>
        <EditorWrapper>
          {editor ? (
            <Widget
              src={editor}
              props={{
                value: { content },
                onChange: (v) => {
                  setContent(v);
                  set(draftKey, v);
                },
              }}
            />
          ) : (
            <DefaultEditor
              value={content}
              onBlur={() => {
                let v;
                if (language === "json") {
                  v = JSON.stringify(JSON.parse(content), null, 2);
                  if (v !== "null") {
                    setContent(v);
                    set(draftKey, v);
                  }
                }
              }}
              onChange={(e) => {
                let v = e.target.value;
                setContent(v);
                Storage.privateSet(draftKey, v);
              }}
            />
          )}
        </EditorWrapper>
        <EditorWrapper>
          <MarkdownViewer value={content} />
        </EditorWrapper>
      </div>
    )}
  </PageContainer>
);
