
function get({ path, initialProps }) {
  Social.get(path)
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