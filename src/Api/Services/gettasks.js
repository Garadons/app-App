import request from "./request";

async function gettasks() {
  try {
    const q = "q";
    let responce = await request(
      "http://localhost:5000/api/gettasks",
      "POST",
      true,
      { q }
    );
    responce = await responce.json();
    return responce;
  } catch (error) {
    console.log(error.message);
  }
}

export default gettasks;
