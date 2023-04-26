import React, { FC, ReactNode } from "react";
import { Form, NavLink, Outlet, useLocation } from "react-router-dom";
import classNames from "classnames";

import styles from "./FormContainer.module.scss";
import { Theme, useThemeContext } from "src/context/Theme/Context";
import Title from "src/components/Title";
import { RoutesList } from "src/utils/@globalTypes";

type Titles = {
	[k in string]: string;
};

const TITLES: Titles = {
	[RoutesList.SignIn]: "Sign In",
	[RoutesList.SignUp]: "Sign Up",
	[RoutesList.ResetPassword]: "Reset password",
	[RoutesList.NewPassword]: "New password",
	[RoutesList.Success]: "Success",
	[RoutesList.Confirm]: "Registration confirmation",
};

const FormContainer = () => {
	const { theme } = useThemeContext();
	const isDark = theme === Theme.Dark;

	const location = useLocation();

	const title = TITLES[location.pathname];

	return (
		<div
			className={classNames(styles.container, {
				[styles.containerDark]: isDark,
			})}
		>
			<NavLink
				to={RoutesList.Home}
				className={classNames(styles.backHome, {
					[styles.backHomeDark]: isDark,
				})}
			>
				Back to home
			</NavLink>
			<div className={classNames(styles.title)}>
				<Title title={title || ""} />
			</div>
			<div className={styles.wrapper}>
				<div
					className={classNames(styles.inputContainer, {
						[styles.inputContainerDark]: isDark,
					})}
				>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default FormContainer;
