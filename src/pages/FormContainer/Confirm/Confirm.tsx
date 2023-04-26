import React from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import styles from "./Confirm.module.scss";
import classNames from "classnames";
import Button from "../../../components/Button";
import { ButtonType, RoutesList } from "src/utils/@globalTypes";
import { Theme, useThemeContext } from "src/context/Theme/Context";
import { useDispatch } from "react-redux";
import { activateUser } from "src/redux/reducers/authSlice";

const Confirm = () => {
	const { theme } = useThemeContext();
	const isDark = theme === Theme.Dark;
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { uid, token } = useParams();
	const onConfirmButtonClick = () => {
		if (uid && token) {
			dispatch(
				activateUser({
					data: { uid, token },
					callback: () => navigate(RoutesList.Success),
				})
			);
		}
	};
	return (
		<>
			<div className={styles.wrapper}>
				<div
					className={classNames(styles.confirm, {
						[styles.confirmDark]: isDark,
					})}
				>
					<div className={styles.formText}>
						Please activate your account with the activation link in the email.
						Please, check your email
					</div>
					<div className={styles.button}>
						<Button
							title={"Confirm"}
							onClick={onConfirmButtonClick}
							type={ButtonType.Primary}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Confirm;
