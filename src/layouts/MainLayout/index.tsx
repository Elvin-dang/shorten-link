import React, { Suspense, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { AppDispatch, RootState } from "@config/store";
import { connect } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { privateRoutes } from "@/config/routes";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import { setUserState } from "@/slices/userSlice";
import { Spin } from "antd";
import Header from "../Header";

type Props = {
  dispatch: AppDispatch;
};

const MainLayout = ({ dispatch }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [shouldRender, setShouldRender] = useState<boolean>(false);

  useEffect(() => {
    if (
      privateRoutes.findIndex((route) => route.path === location.pathname) > -1
    ) {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const token = await user.getIdToken();
          dispatch(
            setUserState({
              accessToken: token,
              displayName: user.displayName,
              email: user.email,
              emailVerified: user.emailVerified,
              photoURL: user.photoURL,
              uid: user.uid,
            })
          );
          setShouldRender(true);
        } else {
          setShouldRender(false);
          navigate("/login", { state: { from: location } });
        }
      });

      return () => {
        setShouldRender(false);
        unsubscribe();
      };
    } else {
      navigate("/notfound");
    }
  }, [navigate, dispatch]);

  return shouldRender ? (
    <div className={styles.container}>
      <Header />
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "2rem 0",
            }}
          >
            <Spin size="large" />
          </div>
        }
      >
        <Routes>
          {privateRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={<route.element />} />
          ))}
        </Routes>
      </Suspense>
    </div>
  ) : (
    <></>
  );
};

export default connect()(MainLayout);
