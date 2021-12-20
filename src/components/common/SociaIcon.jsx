import React from "react";

function SociaIcon(props) {
  const { icon, link, alt } = props;

  return (
    <a href={link}>
      <img src={icon} alt={alt} />
    </a>
  );
}

export default SociaIcon;
