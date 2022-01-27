async function request(url, method = "GET", isToken, data = null) {
  try {
    const headers = {};
    let token;
    let body;

    if (isToken) {
      token = localStorage.getItem("accessToken");
    }

    if (data) {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify({ token, ...data });
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
