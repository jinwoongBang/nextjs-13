import React from "react";

type Props = {
  className?: string;
  type: string;
  placeholder?: string;
  iconAlt: string;
  icoSrc: string;
  value?: string;
  onChangeHandler: (value: string) => void;
  onBlurHandler?: () => void;
};

function InputContainer(props: Props) {
  return <div>InputContainer</div>;
}

export default InputContainer;
