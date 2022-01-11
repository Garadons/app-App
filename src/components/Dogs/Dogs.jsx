import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import "./Dogs.css";

function Dogs() {
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

  return (
    <>
      <div className="dogContainer">
        {dogsArray &&
          dogsArray.map((t, id) => (
            <div className="dogImgContainer" key={id}>
              <img className="dogImg" src={t} alt="" />
            </div>
          ))}
      </div>
    </>
  );
}

export default Dogs;
