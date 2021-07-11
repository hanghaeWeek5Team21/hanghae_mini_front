import React from "react";
import { Button, Input } from "../elements";

const TextForm = (props) => {
  const { value, placeholder, btnName, _onSubmit, _onChange } = props;

  return (
    <form onSubmit={_onSubmit}>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        _onChange={_onChange}
      />
      <Button text={btnName} />
    </form>
  );
};

TextForm.defaultProps = {
  _onSubmit: () => {},
  _onChange: () => {},
  value: "",
  placeholder: "",
  btnName: "제출",
};

export default TextForm;
