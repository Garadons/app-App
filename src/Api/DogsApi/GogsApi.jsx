async function GogsApi() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/image/random/9");
    const data = await response.json();
    if (data.status != "success") {
      throw Error("Server error");
    } else {
      return data;
    }
  } catch (error) {
    alert(error.name);
  }
}

export default GogsApi;
