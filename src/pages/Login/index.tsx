import { auth } from "@/config/firebase";
import { codeToString } from "@/utils/string";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LoadingOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { FormEvent, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

type Props = {};

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || ({ from: { pathname: "/" } } as any);

  const [loginInShowPassword, setLoginInShowPassword] =
    useState<boolean>(false);
  const [loginInErrorMessage, setLoginInErrorMessage] = useState<string>();
  const [loginInLoading, setLoginInLoading] = useState<boolean>(false);

  const loginInRef = useRef<HTMLFormElement>(null);
  const loginInEmailRef = useRef<HTMLInputElement>(null);
  const loginInPasswordRef = useRef<HTMLInputElement>(null);

  const [timeOut, setTimeOut] = useState<NodeJS.Timeout>();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loginInEmailRef.current && loginInPasswordRef.current) {
      if (
        !loginInEmailRef.current.value.match(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        )
      ) {
        setLoginInErrorMessage("First field must be an email");
        setTimeOut(setTimeout(() => setLoginInErrorMessage(undefined), 10000));
        return;
      }

      try {
        setLoginInLoading(true);
        await signInWithEmailAndPassword(
          auth,
          loginInEmailRef.current.value,
          loginInPasswordRef.current.value
        );
        if (timeOut) clearTimeout(timeOut);
        navigate(from.pathname);
      } catch (err: any) {
        setLoginInLoading(false);
        setLoginInErrorMessage(codeToString(err.code.split("/")[1]));
        setTimeOut(setTimeout(() => setLoginInErrorMessage(undefined), 10000));
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <form
          action=""
          className={styles.form}
          id="login"
          ref={loginInRef}
          onSubmit={handleLogin}
        >
          <h1 className={styles.title}>Login</h1>
          <div className={styles.box}>
            <UserOutlined className={styles.icon} />
            <input
              type="text"
              placeholder="Email"
              className={styles.input}
              required
              ref={loginInEmailRef}
            />
          </div>

          <div className={styles.box}>
            <LockOutlined className={styles.icon} />
            <input
              type={loginInShowPassword ? "text" : "password"}
              placeholder="Password"
              className={`${styles.input} ${styles.password}`}
              required
              ref={loginInPasswordRef}
            />
            {loginInShowPassword ? (
              <EyeInvisibleOutlined
                className={styles.icon_show_password}
                style={{ display: "flex", alignItems: "center" }}
                onClick={() => setLoginInShowPassword(false)}
              />
            ) : (
              <EyeOutlined
                className={styles.icon_show_password}
                style={{ display: "flex", alignItems: "center" }}
                onClick={() => setLoginInShowPassword(true)}
              />
            )}
          </div>

          <div
            className={
              loginInErrorMessage
                ? `${styles.box} ${styles.error} ${styles.show}`
                : `${styles.box} ${styles.error}`
            }
          >
            {loginInErrorMessage}
          </div>

          <button className={styles.forgot} type="button">
            Forgot password?
          </button>

          <div className={styles.button_wrapper}>
            <button
              className={
                loginInLoading
                  ? `${styles.button} ${styles.loading}`
                  : `${styles.button}`
              }
              type="submit"
            >
              {loginInLoading ? <LoadingOutlined /> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
