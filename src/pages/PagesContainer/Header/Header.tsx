import React, { useMemo, useState, KeyboardEvent } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import Button from "src/components/Button";
import { ButtonType, RoutesList } from "src/utils/@globalTypes";
import { CloseMenu, OpenMenu, SearchIcon, UserIcon } from "src/assets/icons";
import UserName from "src/components/User";
import ThemeSwitcher from "src/components/ThemeSwitcher";
import Input from "src/components/Input";
import styles from "./Header.module.scss";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { AuthSelectors, logoutUser } from "src/redux/reducers/authSlice";
import { getSearchedPosts } from "src/redux/reducers/postSlice";

const Header = () => {
	const [isOpened, setOpened] = useState(false);
	const [isInputOpened, setInputOpened] = useState(false);
	const [searchValue, setSearchValue] = useState("");

	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();
	const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);
	const userInfo = useSelector(AuthSelectors.getUserInfo);
	const userName = userInfo?.username ? userInfo?.username : "Random Name";

	const onClickMenuButton = () => {
		setOpened(!isOpened);
	};

	const onAuthButtonClick = () => {
		navigate(RoutesList.SignIn);
	};

	const onLogoutClick = () => {
		dispatch(logoutUser());
	};
	const navButtonsList = useMemo(
		() => [
			{
				title: "Home",
				key: RoutesList.Home,
			},
			...(!isLoggedIn ? [] : [{ title: "Add Post", key: RoutesList.AddPost }]),
		],
		[isLoggedIn]
	);

	const onClickSearchButton = () => {
		setInputOpened(!isInputOpened);
		if (isInputOpened) {
			dispatch(getSearchedPosts(searchValue));
			navigate(RoutesList.Search);
		}
	};

	const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			onClickSearchButton();
		}
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.infoContainer}>
					<Button
						title={isOpened ? <CloseMenu /> : <OpenMenu />}
						onClick={onClickMenuButton}
						type={ButtonType.Primary}
						className={styles.button}
					/>
					{isInputOpened && (
						<Input
							value={searchValue}
							onChange={setSearchValue}
							onKeyDown={onKeyDown}
							inputClassName={styles.input}
							placeholder="Search..."
						/>
					)}
				</div>
				<div className={styles.infoContainer}>
					<Button
						title={<SearchIcon />}
						onClick={onClickSearchButton}
						type={ButtonType.Primary}
						className={styles.button}
					/>
					{isLoggedIn && userInfo ? (
						<UserName username={userName} />
					) : (
						<Button
							title={<UserIcon />}
							onClick={onAuthButtonClick}
							type={ButtonType.Primary}
							className={styles.button}
						/>
					)}
				</div>
			</div>

			{isOpened && (
				<div className={styles.menuContainer}>
					<div className={styles.actionsContainer}>
						{isLoggedIn && userInfo ? <UserName username={userName} /> : null}
						{navButtonsList.map(({ key, title }) => {
							return (
								<NavLink
									to={key}
									key={key}
									className={classNames(styles.navButton, {
										[styles.activeNavButton]: location.pathname === key,
									})}
								>
									{title}
								</NavLink>
							);
						})}
					</div>
					<div>
						<ThemeSwitcher />
						<Button
							title={isLoggedIn ? "Log out" : "Sign In"}
							onClick={isLoggedIn ? onLogoutClick : onAuthButtonClick}
							type={ButtonType.Secondary}
							className={styles.authButton}
						/>
					</div>
				</div>
			)}
		</>
	);
};

export default Header;
