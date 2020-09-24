import React from "react";
import Button from "./baseComponents/button/Button";

export default function BtnList(props) {
  return props.buttons.map((button, index) => (
    <Button key={index} {...button}>
      {button.innerHTML}
    </Button>
  ));
}
