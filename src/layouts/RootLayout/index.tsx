import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import styles from "./styles.module.css";

export default function RootLayout() {
  return (
    <>
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>
    </>
  )
}