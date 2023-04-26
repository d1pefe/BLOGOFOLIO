import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PagesContainer from "./PagesContainer";
import SignIn from "./FormContainer/SignIn";
import Home from "./Home";
import Success from "./FormContainer/Success";
import SignUp from "./FormContainer/SignUp";
import Confirm from "./FormContainer/Confirm";
import Post from "./Post";
import FormContainer from "./FormContainer";
import ResetPassword from "./FormContainer/ResetPassword";
import NewPassword from "./FormContainer/NewPassword";
import { RoutesList } from "../utils/@globalTypes";
import { useDispatch, useSelector } from "react-redux";
import { AuthSelectors, getUserInfo } from "../redux/reducers/authSlice";
import { getMyPosts } from "src/redux/reducers/postSlice";
import Search from "./Search";

// RoutesList в @globaltypes.ts

const Router = () => {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);

	useEffect(() => {
		if (isLoggedIn) {
			dispatch(getUserInfo());
			dispatch(getMyPosts());
		}
	}, [isLoggedIn]);

	return (
		<BrowserRouter>
			<Routes>
				<Route path={RoutesList.Home} element={<PagesContainer />}>
					<Route path={RoutesList.Home} element={<Home />} />
					<Route path={RoutesList.SinglePost} element={<Post />} />
					<Route path={RoutesList.AccountLogin} element={<FormContainer />}>
						<Route path={RoutesList.SignIn} element={<SignIn />} />
						<Route path={RoutesList.Success} element={<Success />} />
						<Route path={RoutesList.SignUp} element={<SignUp />} />
						<Route path={RoutesList.Confirm} element={<Confirm />} />
						<Route
							path={RoutesList.ResetPassword}
							element={<ResetPassword />}
						/>
						<Route path={RoutesList.NewPassword} element={<NewPassword />} />
					</Route>
					<Route
						path={RoutesList.AddPost}
						element={
							isLoggedIn ? <Home /> : <Navigate to={RoutesList.SignIn} />
						}
					/>
					<Route path={RoutesList.Search} element={<Search />} />
					<Route path={RoutesList.Default} element={<div>404 NOT FOUND</div>} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
