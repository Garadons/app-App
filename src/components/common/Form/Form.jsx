import React from "react";

function Form(props) {
  const { action, onSubmit } = props;
  return (
    <form onSubmit={onSubmit} action={action}>
      {props.children}
    </form>
  );
}

export default Form;
