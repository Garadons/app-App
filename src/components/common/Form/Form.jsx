import React from "react";

function Form(props) {
  const { action, onSubmit, onClick } = props;
  return (
    <form onSubmit={onSubmit} onClick={onClick} action={action}>
      {props.children}
    </form>
  );
}

export default Form;
