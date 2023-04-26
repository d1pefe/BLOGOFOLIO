import React from "react";
import { Outlet } from "react-router-dom";
import classNames from "classnames";

import styles from "./PagesContainer.module.scss";
import { Theme, useThemeContext } from "src/context/Theme/Context";
import Header from "./Header";

const PagesContainer = () => {
	const { theme } = useThemeContext();

	return (
		<div
			className={classNames(styles.container, {
				[styles.darkContainer]: theme === Theme.Dark,
			})}
		>
			<Header />
			<div className={styles.mainInfo}>
				<Outlet />
				<div className={styles.footer}>
					<div>©2022 Blogfolio</div>
					<div>All rights reserved</div>
				</div>
			</div>
		</div>
	);
};

export default PagesContainer;
