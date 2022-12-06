import { auth } from "@/config/firebase";
import { AppDispatch, RootState } from "@/config/store";
import { resetUserState } from "@/slices/userSlice";
import React from "react";
import { connect } from "react-redux";
import styles from "./styles.module.scss";

type Props = {
  userName: string | null;
  dispatch: AppDispatch;
};

const Header = ({ userName, dispatch }: Props) => {
  const handleLogout = async () => {
    await auth.signOut();
    dispatch(resetUserState());
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.welcome}>
        {userName ? `Hi, ${userName}!` : `Hi!`}
      </h1>
      <button className={styles.logout} onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
};

const mapState = ({ user }: RootState) => ({
  userName: user.displayName,
});

export default connect(mapState)(Header);
