const { basePath, param } = props;

const { get } = VM.require("${config_account}/widget/utils.db") || {
  get: () => {},
};

const { Button } = VM.require("buildhub.near/widget/components") || {
  Button: () => <></>,
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

const Sidebar = styled.div`
  margin-left: 24px;
  margin-top: 42px;
`;

const [dropdown, setDropdown] = useState({});
const toggleDropdown = (parentSection) => {
  setDropdown((prevState) => ({
    ...prevState,
    [parentSection]: !prevState[parentSection] || false,
  }));
};

return (
  <Sidebar className="sidebar">
    {Object.keys(groupedSections).map((parentSection) => (
      <div className="parent-section" key={parentSection}>
        {/* Render parent section */}
        <div className="parent-section">
          <Link to={`/${basePath}?${param}=${parentSection}`}>
            {/* <button>{documents[parentSection].title}</button> */}
            <Button
              onClick={() => {
                toggleDropdown(parentSection); // Toggle dropdown state for the clicked parent section
              }}
              variant="outline"
              className={props.page === parentSection ? "active" : ""}
            >
              {documents[parentSection].title}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M4 6L8 10L12 6"
                  stroke="#171717"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Button>
          </Link>
        </div>

        {/* Render child sections */}
        {dropdown[parentSection] && (
          <div className="nested-section">
            {groupedSections[parentSection].map((childSection) => (
              <div className="child-section" key={childSection}>
                <Link to={`/${basePath}?${param}=${parentSection}/${childSection}`}>
                  <a
                    className={
                      props.page === `${parentSection}/${childSection}` ? "active-child" : ""
                    }
                  >
                    {documents[`${parentSection}/${childSection}`].title}
                  </a>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    ))}
  </Sidebar>
);
