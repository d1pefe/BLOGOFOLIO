import React, { FC, useMemo, useState } from "react";
import classNames from "classnames";
import styles from "./Tabs.module.scss";
import { Theme, useThemeContext } from "src/context/Theme/Context";
import { TabsNames } from "src/utils/@globalTypes";
import { useSelector } from "react-redux";
import { AuthSelectors } from "src/redux/reducers/authSlice";

type TabsProps = {
	activeTab: TabsNames;
	onTabClick: (tab: TabsNames) => () => void;
};

const Tabs: FC<TabsProps> = ({ activeTab, onTabClick }) => {
	const { theme } = useThemeContext();

	const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);

	const TABS_LIST = useMemo(
		() => [
			{
				title: "All",
				disabled: false,
				key: TabsNames.All,
			},
			{
				title: "My Posts",
				disabled: !isLoggedIn,
				key: TabsNames.MyPosts,
			},
			{
				title: "Popular",
				disabled: false,
				key: TabsNames.Popular,
			},
			{
				title: "Favourites",
				disabled: false,
				key: TabsNames.Favourites,
			},
		],
		[isLoggedIn]
	);
	return (
		<div
			className={classNames(styles.container, {
				[styles.darkContainer]: theme === Theme.Dark,
			})}
		>
			{TABS_LIST.map((tab) => {
				return (
					<div
						key={tab.key}
						className={classNames(styles.tab, {
							[styles.activeTab]: activeTab === tab.key,
							[styles.disabled]: tab.disabled,
						})}
						onClick={tab.disabled ? undefined : onTabClick(tab.key)}
					>
						{tab.title}
					</div>
				);
			})}
		</div>
	);
};

export default Tabs;
