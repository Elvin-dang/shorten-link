import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  accessToken: string;
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  photoURL: string | null;
  uid: string;
}

const initialState: UserState = {
  accessToken: "",
  displayName: null,
  email: "",
  emailVerified: false,
  photoURL: null,
  uid: "",
};

const userSlice = createSlice({
  name: "User",
  initialState: initialState,
  reducers: {
    setUserState: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
    resetUserState: () => {
      return initialState;
    },
  },
});

export const { setUserState, resetUserState } = userSlice.actions;

export default userSlice.reducer;
