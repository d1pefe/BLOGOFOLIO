import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ACCESS_TOKEN_KEY } from "src/utils/constants";
import { UserInfoResponse } from "../sagas/@types";

import { RootState } from "../store";
import {
	SignUpUserPayload,
	ActivateUserPayload,
	SignInUserPayload,
} from "./@types";

type AuthType = {
	isLoggedIn: boolean;
	userInfo: UserInfoResponse | null;
};

// isLoggedIn: !!localStorage.getItem(ACCESS_TOKEN_KEY)
// Если в localstorage есть токен, то вернет его (и !! сделает true),
// если нет, то вернет undefined и будет false
const initialState: AuthType = {
	isLoggedIn: !!localStorage.getItem(ACCESS_TOKEN_KEY),
	userInfo: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		signUpUser: (_, __: PayloadAction<SignUpUserPayload>) => {},
		activateUser: (_, __: PayloadAction<ActivateUserPayload>) => {},
		signInUser: (_, __: PayloadAction<SignInUserPayload>) => {},
		setLoggedIn: (state, action: PayloadAction<boolean>) => {
			state.isLoggedIn = action.payload;
		},
		logoutUser: (_, __: PayloadAction<undefined>) => {},
		getUserInfo: (_, __: PayloadAction<undefined>) => {},
		setUserInfo: (state, action: PayloadAction<UserInfoResponse | null>) => {
			state.userInfo = action.payload;
		},
	},
});

export const {
	signUpUser,
	activateUser,
	signInUser,
	setLoggedIn,
	logoutUser,
	getUserInfo,
	setUserInfo,
} = authSlice.actions;
export default authSlice.reducer;

export const AuthSelectors = {
	getLoggedIn: (state: RootState) => state.auth.isLoggedIn,
	getUserInfo: (state: RootState) => state.auth.userInfo,
};
