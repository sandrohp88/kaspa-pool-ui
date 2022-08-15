const port = process.env.PORT || 4000;
const ROOT_URL = `http://host.docker.internal:${port}`;

export default async function sendRequest(path, options = {}) {
  const headers = {
    ...(options.headers || {}),
    "Content-type": "application/json; charset=UTF-8",
  };

  const response = await fetch(`${ROOT_URL}${path}`, {
    method: "POST",
    credentials: "same-origin",
    ...options,
    headers,
  });

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}
