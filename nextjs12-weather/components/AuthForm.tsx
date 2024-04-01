import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import InputContainer from "./InputContainer";

import emailIcon from "@/public/email_envelope_mail_send_icon.svg";
import lockIcon from "@/public/lock_locker_icon.svg";
import { User } from "@/model/customTypes";
import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

async function registerUser(userData: User) {
  const response = await fetch("api/auth/signup", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

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

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData: User = { enteredEmail, enteredPassword };

    // Form validation
    if (
      enteredEmail?.trim().length === 0 ||
      enteredPassword?.trim().length === 0
    ) {
      alert("먼저 유저이름과 비밀번호를 입력해주세요.");
      return;
    }

    if (!isLogin) {
      if (enteredPassword !== enteredConfirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      try {
        const response = await registerUser(userData);

        alert("회원가입에 성공했습니다.");
      } catch (error) {
        console.error(error);
      }
    } else {
      const result = await signIn("credentials", {
        redirect: false,
        enteredEmail,
        enteredPassword,
      });

      if (!result?.error) {
        router.replace("/weather");
      }

      if (result?.error) {
        console.error(result?.error);
      }
    }
  };

  return (
    <form className="auth__form" onSubmit={submitHandler}>
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
