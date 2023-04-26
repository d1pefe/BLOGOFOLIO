import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Success.module.scss";
import Title from "../../../components/Title";
import classNames from "classnames";
import Button from "../../../components/Button";
import { ButtonType, RoutesList } from "../../../utils/@globalTypes";
import { Theme, useThemeContext } from "../../../context/Theme/Context";

const Success = () => {
	const { theme } = useThemeContext();
	const isDark = theme === Theme.Dark;
	const navigate = useNavigate();

	const onHomeClick = () => {
		navigate(RoutesList.Home);
	};

	return (
		<>
			<div
				className={classNames(styles.email, {
					[styles.emailDark]: isDark,
				})}
			>
				<div>Email confirmed.</div>
				Your registration is now completed
				<div className={styles.button}>
					<Button
						title={"Go to Home"}
						onClick={onHomeClick}
						type={ButtonType.Primary}
					/>
				</div>
			</div>
		</>
	);
};

export default Success;
