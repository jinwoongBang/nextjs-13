import { useRouter } from "next/router";
import React, { useState } from "react";
import InputContainer from "./InputContainer";

import emailIcon from "@/public/email_envelope_mail_send_icon.svg";
import lockIcon from "@/public/lock_locker_icon.svg";

function AuthForm() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const authModeHandler = () => {
    setIsLogin((prev) => !prev);
    setEnteredEmail("");
    setEteredPassword("");
    setEnteredConfirmPassword("");
  };

  return (
    <form className="auth__form">
      <InputContainer
        type="email"
        value={enteredEmail}
        onChangeHandler={setEnteredEmail}
        placeholder="이메일을 입력해주세요."
        iconAlt="email icon"
        icoSrc={emailIcon}
      />
      <InputContainer
        type="password"
        value={enteredPassword}
        onChangeHandler={setEteredPassword}
        placeholder="비밀번호를 입력해주세요."
        iconAlt="lock icon"
        icoSrc={lockIcon}
      />
      {!isLogin && (
        <InputContainer
          type="password"
          value={enteredConfirmPassword}
          onChangeHandler={setEnteredConfirmPassword}
          placeholder="비밀번호를 입력해주세요."
          iconAlt="lock icon"
          icoSrc={lockIcon}
        />
      )}
      <button className="auth__btn">
        {isLogin ? "Login" : "Create Account"}
      </button>
      <div className="auth__mode">
        {isLogin ? "이미 계정이 있습니까?" : "존재하는 아이디로 로그인하기"}
        <button
          className="ml-2 text-primary"
          type="button"
          onClick={authModeHandler}
        >
          {isLogin ? "회원가입" : "로그인"}
        </button>
      </div>
    </form>
  );
}

export default AuthForm;
