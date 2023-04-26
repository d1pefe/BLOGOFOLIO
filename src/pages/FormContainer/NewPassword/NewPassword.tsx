import React, { useEffect, useMemo, useState } from "react";
import Button from "src/components/Button";
import Input from "src/components/Input";
import { ButtonType } from "src/utils/@globalTypes";
import styles from "./NewPassword.module.scss";

const NewPassword = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [passwordError, setPasswordError] = useState("");

	const onChangePassword = (value: string) => {
		setPassword(value);
	};
	const onChangeConfirmPassword = (value: string) => {
		setConfirmPassword(value);
	};

	useEffect(() => {
		if (password !== confirmPassword) {
			setPasswordError("Passwords must match");
		} else if (password.length === 0 || confirmPassword.length === 0) {
			setPasswordError("Password is a required field");
		} else {
			setPasswordError("");
		}
	}, [confirmPassword, password]);

	const isValid = useMemo(() => {
		return passwordError.length === 0;
	}, [passwordError]);

	return (
		<div className={styles.inputWrapper}>
			<Input
				value={password}
				onChange={onChangePassword}
				type={"password"}
				title="Password"
				placeholder="Your password"
				errorText={passwordError}
			/>
			<Input
				value={confirmPassword}
				onChange={onChangeConfirmPassword}
				type={"password"}
				title="Confirm password"
				placeholder="Confirm your password"
				errorText={passwordError}
			/>

			<div className={styles.button}>
				<Button
					title={"Set password "}
					disabled={!isValid}
					onClick={() => {}}
					type={ButtonType.Primary}
				/>
			</div>
		</div>
	);
};

export default NewPassword;
