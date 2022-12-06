import routes, { publicRoutes } from "@/config/routes";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import MainLayout from "@layouts/MainLayout";
import styles from "./App.module.scss";

function App() {
  const location = useLocation();

  useEffect(() => {
    routes.forEach((item) => {
      if (window.location.pathname.includes(item.path)) {
        window.document.title = item.title
          ? "ShortenLink | " + item.title
          : "ShortenLink";
      }
    });
  }, []);

  useEffect(() => {
    routes.forEach((item) => {
      if (location.pathname.includes(item.path)) {
        window.document.title = item.title
          ? "ShortenLink | " + item.title
          : "ShortenLink";
      }
    });
  }, [location]);

  return (
    <div className={styles.container}>
      <Routes>
        {publicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.element />} />
        ))}
        <Route path="*" element={<MainLayout />} />
      </Routes>
    </div>
  );
}

export default App;
