const { basePath, param } = props;

const { get } = VM.require("${config_account}/widget/utils.db") || {
  get: () => {},
};

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

const Sidebar = styled.div``;

console.log(documents);

return (
  <Sidebar className="sidebar">
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
