const { basePath, param } = props;

const { get } = VM.require("${config_account}/widget/utils.db");

const documents = get();

// Preprocess documents to group paths by their parent sections
const groupedSections = {};
Object.keys(documents).forEach((path) => {
  const parts = path.split("/");
  const parentSection = parts[0];
  const childSection = parts.length > 1 ? parts[1] : null;

  if (!groupedSections[parentSection]) {
    groupedSections[parentSection] = [];
  }

  // Ensure child section is only added once per parent section
  if (childSection && !groupedSections[parentSection].includes(childSection)) {
    groupedSections[parentSection].push(childSection);
  }
});

const Sidebar = styled.div`
  width: 300px;
  height: 100vh;
  padding: 8px;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  .parent-section,
  .child-section {
    a {
      text-decoration: none;
      width: 100%;
    }
    button {
      all: unset;
      width: 100%;
      padding: 6px 12px;
      background: transparent;
      color: black !important;
      font-weight: 500;
      box-sizing: border-box;
      border-radius: 8px;
      &:hover {
        text-decoration: none;
        background: rgba(0, 0, 0, 0.05);
      }
    }

    .active {
      background: rgba(0, 0, 0, 0.05);
      color: #2e8555 !important;
    }
  }
  .nested-section {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
`;

console.log(documents);

return (
  <Sidebar>
    {Object.keys(groupedSections).map((parentSection) => (
      <div className="parent-section" key={parentSection}>
        {/* Render parent section */}
        <div className="parent-section">
          <Link to={`/${basePath}?${param}=${parentSection}`}>
            {/* <button>{documents[parentSection].title}</button> */}
            <button className={props.page === parentSection ? "active" : ""}>
              {documents[parentSection].title}
            </button>
          </Link>
        </div>

        {/* Render child sections */}
        <div className="nested-section">
          {groupedSections[parentSection].map((childSection) => (
            <div className="child-section" key={childSection}>
              <Link to={`/${basePath}?${param}=${parentSection}/${childSection}`}>
                <button
                  className={props.page === `${parentSection}/${childSection}` ? "active" : ""}
                >
                  {documents[`${parentSection}/${childSection}`].title}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    ))}
  </Sidebar>
);
