/**
 * This is the index
 * We can get some data from the project itself
 * metadata, name, description, tags, etc.
 * We want the document paths... We want to be able to add or remove them...
 *
 * What would be ideal for this? It can be a post or a page
 * If it is a post, then we got comments on it directly.
 *
 * If you'd like to leave any questions, feel free to comment directly on the page.
 *
 * I want to be able to render some embeddings
 */

const config = {
  docName: "BOS Workspace Docs",
  theme: {
    "--main-color": "black",
    "--secondary-color": "black",
    background: "var(--main-color)",
    color: "var(--secondary-color)",
    "--active-link-color": "rgb(46, 133, 85)",
  },
  layout: {
    src: "${alias_devs}/widget/Layout",
    initialProps: {
      variant: "sidebar",
    },
  },
  blocks: {
    // these get passed to the layout and children
    Header: () => (
      // customize your header
      <Widget
        src="${config_account}/widget/components.Header"
        props={{
          routes: config.router.routes,
          basePath: "${config_account}/widget/index",
          param: "page",
          docName: config.docName,
          headerRoutes: config.headerRoutes.routes,
          ...props,
        }}
      />
    ),
    Footer: () => <></>, // customize your footer
    Sidebar: () => (
      <Widget
        src="${config_account}/widget/components.Sidebar"
        props={{
          routes: config.router.routes,
          basePath: "${config_account}/widget/index",
          param: "page",
          ...props,
        }}
      />
    ),
  },
  headerRoutes: {
    routes: [
      {
        path: "https://near.org",
        label: "near.org",
      },
      {
        path: "https://near.org",
        label: "near.org",
      },
      {
        path: "https://near.org",
        label: "near.org",
      },
    ],
  },
  router: {
    param: "page",
    routes: [
      {
        path: "/",
        element: {
          src: "${config_account}/widget/home",
          initialProps: {},
        },
      },
      {
        path: "/edit/:path*",
        element: {
          src: "${config_account}/widget/edit",
          initialProps: {},
        },
      },
      {
        path: "/settings",
        element: {
          src: "${config_account}/widget/settings",
          initialProps: {},
        },
      },
      {
        path: "/:path*",
        element: {
          src: "${config_account}/widget/document",
        },
      },
    ],
  },
};

const InterCSS = fetch(
  `"https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"`
).body;

const CSS = styled.div`
  ${InterCSS}

  * {
    box-sizing: border-box;
    font-weight: 400;
    font-family: Poppins, sans-serif;
    background: #000;
  }

  /* .window {
    /* -webkit-font-smoothing: none; */
  letter-spacing: 0.025em;

  background-color: #fff;
  height: 100vh;
  width: 100% !important;

  border-radius: 5px;
  padding-left: 1.5rem;
  padding-right: 1.5rem;

  /* .sidebar {
    padding: 20px;
    width: 250px;
  } */

  /* .nested-section {
    margin-bottom: 10px;
  }

  .parent-section {
    margin-bottom: 5px;
  } */

  /* .child-section {
    margin-left: 20px; 
  } */

  /* .button {
    display: block;
    width: 100%;
    padding: 8px;
    margin: 0;
    border: none;
    text-align: left;

    -moz-appearance: none;
    appearance: none;
    font-weight: 700;
    letter-spacing: 0.05em;
    padding: 0.45em 0.75em;
    border-left: 2px solid #ededed;
    border-top: 2px solid #ededed;
    border-right: 2px solid #404040;
    border-bottom: 2px solid #404040;

    color: #000;
    background-color: silver;
    position: relative;
    z-index: 10;
  }

  .button:hover {
    background-color: #f0f0f0;
  }

  .separator {
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
  } */

  .link {
    text-decoration: "none";
    color: inherit;
  }

  /* .header {
    width: 100%;
    position: relative;
    color: #fff;
    padding: 0.25em 0.75em;
    line-height: 1.4;
    border-left: 2px solid #ededed;
    border-top: 2px solid #ededed;
    border-right: 2px solid #404040;
    border-bottom: 2px solid #404040;
    background: black;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    color: white;

    .branding {
      margin-right: 24px;
    }

    .nav {
      display: flex;
      flex-direction: row;
      gap: 20px;

      padding: 0 20px;
    }

    .end {
      margin-left: auto;
    }
  } */

  /* .left-branding {
    margin-right: auto; 
  }

  .routes {
    display: flex;
    gap: 20px;
  }

  .settings {
    margin-left: auto; 
  }

  .link {
    text-decoration: none;
    color: white;
  }

  .link:hover {
    text-decoration: underline;
  } */
  .sidebar {
    display: flex;
    width: 259px;
    height: 100vh;
    padding: 24px 12px;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
    border-radius: var(--_16, 16px);
    border: 1px solid var(--23242-b, #23242b);
    background: #000;

    .child-section {
      display: flex;
      padding: 10px 12px;
      align-items: center;
      gap: 12px;
      align-self: stretch;

      a {
        text-decoration: none !important;
        width: 100%;
        color: #fff;
      }

      .active-child {
        border-radius: 6px !important;
        background: rgba(236, 162, 39, 0.2) !important;
      }
    }

    .parent-section {
      a {
        text-decoration: none;
        width: 100%;
      }

      Button {
        display: flex;
        width: 232px;
        height: 40px;
        padding: 10px 12px;
        align-items: center;
        gap: 12px;
        box-sizing: border-box;
      }
      /* button {
        all: unset;
        width: 100%;
        padding: 6px 12px;
        background: transparent;
        color: white !important;
        font-weight: 500;
        box-sizing: border-box;
        border-radius: 8px;
        &:hover {
          text-decoration: none;

        }
      } */

      .active {
        background: var(--eca-227, #eca227);
        color: #000 !important;
      }
    }
    .nested-section {
      margin-top: 0.25rem;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.25rem;
      border-left: 2px solid #c4a6a633;
      margin-left: 3rem;
    }

    @media (max-width: 900px) {
      display: none;
    }
  }

  .sidebar-mobile {
    width: 100%;
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
        color: var(--active-link-color, rgb(46, 133, 85)) !important;
      }
    }
    .nested-section {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
  }

  .header {
    background: #000;
    padding: 24px 48px;
    padding-bottom: 0.5rem;
    border: none;
    border-bottom: 1px solid #c4a6a633;

    .icon {
      font-size: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.125rem 0.5rem;

      &:hover {
        background: rgba(0, 0, 0, 0.05);
        border-radius: 100%;
      }

      @media (max-width: 900px) {
        font-size: 16px;
      }
    }

    a {
      text-decoration: none;
      color: #fff;
    }
  }
  .header-content {
    display: flex;
    align-items: center;
    gap: 40px;
    justify-content: space-between;
    svg {
      height: 32px;
      fill: #fff;

      @media (max-width: 900px) {
        height: 26px;
      }
    }

    a {
      @media (max-width: 900px) {
        font-size: 14px;
      }
    }
  }
  .content {
    flex: 1;
    padding: 48px 96px;
    margin: 20px auto;
    height: 100%;
    color: white;

    @media (max-width: 900px) {
      padding: 1rem;
    }

    h2 {
      color: var(--FFFFFF, #fff);
      font-family: Poppins;
      font-size: 40px;
      font-style: normal;
      font-weight: 400;
      line-height: 120%; /* 48px */
      letter-spacing: -1.6px;
    }
    h3 {
      color: #fff;
      font-family: Poppins;
      font-size: 28px;
      font-style: normal;
      font-weight: 500;
      line-height: 120%; /* 33.6px */
      letter-spacing: -1.12px;
    }

    pre {
      padding: 0;
      div {
        margin: 0 !important;
        border-radius: 6px !important;
      }
    }
  }
`;

return (
  <CSS>
    <Widget src="${config_account}/widget/PR.App" props={{ config, ...props }} />
  </CSS>
);
