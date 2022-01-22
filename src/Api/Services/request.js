async function request(url, method = "GET", data = null) {
  try {
    const headers = {};
    let body;

    if (data) {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify({ data });
    }

    const response = await fetch(url, {
      method,
      headers,
      body,
    });

    return response;
  } catch (e) {
    console.warn("Error:", e.message);
  }
}

export default request;
