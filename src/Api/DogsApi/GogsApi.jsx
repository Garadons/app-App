import React, { useEffect, useState } from "react";

function GogsApi() {
  const [dogsArray, setDogsArray] = useState([]);

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/image/random/9")
      .then((response) => response.json())
      .then((data) => {
        if (data.status != "success") {
          throw Error("Server error");
        }
        return data;
      })
      .then((data) => {
        setDogsArray(data.message);
      })
      .catch((e) => {
        alert(e);
      });
    return () => {};
  }, []);

  return dogsArray;
}

export default GogsApi;
