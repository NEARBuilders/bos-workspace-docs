const { basePath, param, page, docName } = props;

const { get } = VM.require("${config_account}/widget/utils.db") || {
  get: () => {},
};
const { NearIcon } = VM.require("${config_account}/widget/components.NearIcon") || {
  NearIcon: () => <></>,
};

const { SidebarLayout } = VM.require("buildhub.near/widget/template.SidebarLayout") || {
  SidebarLayout: () => <></>,
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

const Button = styled.div`
  font-size: 18px;
  display: none;
  @media (max-width: 900px) {
    display: block;
  }
`;

const DesktopLinks = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 24px;
  flex: 1 0 0;
  @media (max-width: 900px) {
    display: none;
  }
`;

const MobileLinks = styled.div`
  display: flex;
  flex-direction: column;

  gap: 8px;
  a {
    color: black !important;
    text-decoration: none;
  }

  margin-bottom: 1rem;
`;

return (
  <>
    <div className="header  text-black">
      <div className="header-content">
        <div
          style={{
            display: "flex",
            gap: "40px",
          }}
        >
          <div>
            <Button
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample"
              aria-controls="offcanvasExample"
            >
              <i className="text-black bi bi-list"></i>
            </Button>
            <a href="https://near.org/" target="_blank">
              <NearIcon />
            </a>
          </div>
          <div>
            <a href="" className="fw-bold">
              {docName ? docName : "BOS Workspace Docs"}
            </a>
          </div>
          <div>
            <DesktopLinks>
              {props.headerRoutes.length > 0 &&
                props.headerRoutes.map((item) => (
                  <a href={item.path} target="/blank">
                    {item.label}
                  </a>
                ))}
            </DesktopLinks>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <Link
            to={props[param] === "settings" ? `/${basePath}` : `/${basePath}?${param}=settings`}
            className="icon text-white"
          >
            <i className="bi bi-gear"></i>
          </Link>
        </div>
      </div>
    </div>
    <div
      className="offcanvas offcanvas-start"
      tabindex="-1"
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
    >
      <div className="offcanvas-header">
        <h4 className="offcanvas-title fw-bolder" id="offcanvasExampleLabel">
          Menu
        </h4>
        <button
          type="button"
          className="btn-close text-reset me-1"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <div className="sidebar-mobile text-black">
          <MobileLinks>
            <h5 className="fw-bold">Resources</h5>
            {props.headerRoutes.length > 0 &&
              props.headerRoutes.map((item) => (
                <a href={item.path} target="/blank">
                  {item.label}
                </a>
              ))}
          </MobileLinks>
          <div>
            <h5 className="fw-bold">Pages</h5>
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
                          className={
                            props.page === `${parentSection}/${childSection}` ? "active" : ""
                          }
                        >
                          {documents[`${parentSection}/${childSection}`].title}
                        </button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
);
