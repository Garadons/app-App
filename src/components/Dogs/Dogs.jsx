import DogsApi from "../../Api/DogsApi";

import "./Dogs.css";

function Dogs() {
  const dogsArray = DogsApi();
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
