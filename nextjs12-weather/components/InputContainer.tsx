import React from "react";
import Image from "next/image";

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

function InputContainer({
  type,
  value,
  onChangeHandler,
  onBlurHandler,
  placeholder,
  iconAlt,
  icoSrc,
  className,
}: Props) {
  return (
    <div>
      {icoSrc && <Image width={25} height={25} src={icoSrc} alt={iconAlt} />}
      <input
        type={type}
        value={value}
        className={`auth__input ${className}`}
        placeholder={placeholder}
        onBlur={onBlurHandler}
        onChange={(e: { target: HTMLInputElement }) =>
          onChangeHandler(e.target?.value)
        }
      />
    </div>
  );
}

export default InputContainer;
