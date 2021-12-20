import React from "react";

function Form(props) {
  const { action } = props;
  return <form action={action}>{props.children}</form>;
}

export default Form;
