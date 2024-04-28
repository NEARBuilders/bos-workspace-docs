const { Router } = VM.require("${config_account}/widget/PR.Router") || {
  Router: () => <></>,
};

const { config, ...passProps } = props;

if (!config) {
  // TODO: get from settings (or default)
  config = {
    router: {
      param: "page",
      routes: {
        home: {
          default: true,
          path: "efiz.near/widget/Tree",
          blockHeight: "final",
          init: {
            name: "Home",
          },
        },
      },
    },
    blocks: {
      Header: () => <></>, // customize your header
      Footer: () => <></>, // customize your footer
    },
  };
} else {
  // config may be a VM require string
  if (typeof config !== "object") {
    config = VM.require(config) || {};
  }
}

if (!config) {
  return <p>unable to load config: {typeof config === object ? JSON.stringify(config) : config}</p>;
}

const Template = VM.require("${config_account}/widget/PR.Template") || {
  Template: () => <></>,
};

return (
  <Template
    theme={config.theme}
    layout={{
      ...(config.layout ?? {
        src: "${alias_devs}/widget/Layout",
        props: {
          variant: "sidebar",
        },
      }),
    }}
    blocks={config.blocks}
  >
    <Router config={config.router} {...passProps} />
  </Template>
);
