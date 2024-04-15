const USERNAME = "nearbuilders"; // this could come from bos-workspace aliases...
const REPOSITORY = "bos-workspace-docs";
const BRANCH = "main";
const GITHUB_TOKEN = "YOUR_GITHUB_TOKEN";
const PATH_PREFIX = "md";

// Function to construct a GitHub API URL given a file path in a repository
const githubUrl = (path) =>
  `https://raw.githubusercontent.com/${USERNAME}/${REPOSITORY}/${BRANCH}/${PATH_PREFIX}/${path}`;

// Function to retrieve data from GitHub given a file path
function get(path) {
  const res = fetch(githubUrl(path), {
  });
  if (!res.ok) {
    throw { 
      status: res.status, 
      message: `Failed to fetch ${path}: ${res.status} ${res.statusText}` 
    };
  } else {
    return res.body;
  }
}

// Function to create and upload data to GitHub, returning a promise with the URL of the uploaded content
function create(path, data) {
  // Added path to the parameters
  return new Promise((resolve, reject) => {
    if (data.length) {
      const content = btoa(data); // Convert data to Base64 for GitHub API
      asyncFetch(githubUrl(path), {
        method: "PUT",
        headers: {
          Accept: "application/vnd.github.v3+json", // Set Accept header to expect JSON responses
          Authorization: `token ${GITHUB_TOKEN}`, // Authorization header with your GitHub token
          "Content-Type": "application/json", // Set the Content-Type header
        },
        body: JSON.stringify({
          message: `Upload ${path}`, // Commit message
          content: content, // Base64 encoded content
        }),
      })
        .then((response) => response.json()) // Parse the JSON response
        .then((data) => {
          if (data.content && data.content.html_url) {
            resolve({ url: data.content.html_url }); // Resolve the promise with the HTML URL of the new content
          } else {
            throw new Error("Invalid response from GitHub");
          }
        })
        .catch((error) => {
          console.error("Error in create function:", error);
          reject(error); // Reject the promise in case of an error
        });
    } else {
      reject("No data provided"); // Reject the promise if no data is provided
    }
  });
}

// Return the get and create functions for use elsewhere
return { get, create };
