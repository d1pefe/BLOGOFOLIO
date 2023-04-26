import React from "react";

import { MoonIcon, SunIcon } from "src/assets/icons";
import styles from "./ThemeSwitcher.module.scss";
import { Theme, useThemeContext } from "src/context/Theme/Context";
import classNames from "classnames";

const ThemeSwitcher = () => {
	const { theme, onChangeTheme } = useThemeContext();

	const onClick = (value: Theme) => () => onChangeTheme(value);

	return (
		<div className={styles.container}>
			<div
				className={classNames(styles.button, {
					[styles.activeButton]: theme === Theme.Light,
				})}
				onClick={onClick(Theme.Light)}
			>
				<SunIcon />
			</div>
			<div
				className={classNames(styles.button, {
					[styles.activeButton]: theme === Theme.Dark,
				})}
				onClick={onClick(Theme.Dark)}
			>
				<MoonIcon />
			</div>
		</div>
	);
};

export default ThemeSwitcher;
