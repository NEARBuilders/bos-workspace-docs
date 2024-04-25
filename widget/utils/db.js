// const { normalize } = VM.require("${alias_devs}/widget/lib.stringUtils") || {
//   normalize: (str) => str,
// };

/**
 * Transform input into a consistent and standardized format
 *
 * @param {string} text - The input to normalize.
 * @param {string} delimiter - The delimiter to use between words.
 * @returns {string} - normalized input
 */

const normalize = (text, delimiter) => {
  // If no delimiter is provided, default to an underscore
  delimiter = delimiter || "-";

  return (
    text
      // Convert to lowercase
      .toLowerCase()
      // Replace spaces with dashes
      .replace(/\s+/g, delimiter)
      // Replace any non-alphanumeric characters (excluding dashes) with nothing
      .replace(`/[^a-z0-9${delimiter}]/g`, "")
      // Replace multiple consecutive dashes with a single dash
      .replace(`/${delimiter}+/g`, "-")
      // Trim dashes from the start and end of the string
      .replace(`/^${delimiter}+|${delimiter}+$/g`, "")
  );
};

const githubAdapter = "${config_account}/widget/PR.adapter.github";
let adapter = VM.require(githubAdapter);

const data = {
  "": JSON.stringify({
    title: "My Documentation",
    sections: [
      {
        title: "Getting Started", // getting_started/index.md
        content: {
          reference: {
            // _params
            path: "getting_started/index.md",
          },
          adapter: "${config_account}/widget/PR.adapter.github",
        },
        subsections: [
          {
            title: "Installation",
            content: {
              reference: {
                // _params
                path: "getting_started/installation.md",
              },
              adapter: "${config_account}/widget/PR.adapter.github",
            },
          },
          {
            title: "Migration Guide",
            content: {
              reference: {
                // _params
                path: "getting_started/migration_guide.md",
              },
              adapter: "${config_account}/widget/PR.adapter.github",
            },
          },
        ],
      },
      {
        title: "Usage",
        content: {
          reference: {
            // _params
            path: "usage/index.md",
          },
          adapter: "${config_account}/widget/PR.adapter.github",
        },
        subsections: [
          {
            title: "Aliases",
            content: {
              reference: {
                // _params
                path: "usage/aliases.md",
              },
              adapter: "${config_account}/widget/PR.adapter.github",
            },
          },
          {
            title: "Deploy",
            content: {
              reference: {
                // _params
                path: "usage/deploy.md",
              },
              adapter: "${config_account}/widget/PR.adapter.github",
            },
          },
        ],
      },
      {
        title: "Blocks",
        content: {
          reference: {
            // _params
            path: "blocks/index.md",
          },
          adapter: "${config_account}/widget/PR.adapter.github",
        },
        subsections: [
          {
            title: "Layout",
            content: {
              reference: {
                // _params
                path: "devs.near/widget/Layout.demo",
              },
              adapter: "${config_account}/widget/PR.adapter.socialdb",
            },
          },
          {
            title: "Template",
            content: {
              reference: {
                // _params
                path: "mob.near/widget/WidgetSource",
                initialProps: {
                  src: "devs.near/widget/Template",
                },
              },
              adapter: "${config_account}/widget/PR.adapter.socialdb",
            },
          },
          {
            title: "Feed",
            content: {
              reference: {
                // _params
                path: "devs.near/widget/Feed.demo",
              },
              adapter: "${config_account}/widget/PR.adapter.socialdb",
            },
          },
        ],
      },
    ],
  }),
  metadata: {
    name: "bos-workspace",
    description: `bos-workspace is a comprehensive toolset designed to simplify the
      development and deployment of NEAR components and applications. With
      support for hot reload, TypeScript, and multiple app management, it caters
      to developers looking for an efficient and scalable developer environment.`,
  },
};

const documentation = JSON.parse(data[""] || "null");

const contentMap = {};

// Iterate over sections and subsections to populate content map
documentation.sections.forEach((section) => {
  const sectionPath = normalize(section.title, "_");
  contentMap[sectionPath] = { title: section.title, content: section.content };

  section.subsections.forEach((subsection) => {
    const subsectionPath = `${sectionPath}/${normalize(subsection.title, "_")}`;
    contentMap[subsectionPath] = {
      title: subsection.title,
      content: subsection.content,
    };
  });
});

// hyperfile.near/widget/view

// validate // derived from type
// transform // default
// adapter // override

function transform(reference) {
  let path = reference.path;

  let parts = path.split("/");

  if (parts.length === 1) {
    parts.push("index");
    path = parts.join("/");
  }
  return path + ".md";
}

return {
  get: (reference) => {
    if (reference) {
      return adapter.get(transform(reference));
    }

    return contentMap; // index
  },
  create: (k, v) => {
    return adapter.create(transform(k), v);
  },
};
