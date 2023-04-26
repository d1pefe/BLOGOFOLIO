import React, { ChangeEvent, FC, KeyboardEvent } from "react";
import classNames from "classnames";
import styles from "./Input.module.scss";
import { Theme, useThemeContext } from "src/context/Theme/Context";

type InputProps = {
	title?: string;
	placeholder: string;
	value: string;
	onChange: (value: string) => void;
	onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
	disabled?: boolean;
	errorText?: string;
	type?: string;
	inputClassName?: string;
};

const Input: FC<InputProps> = ({
	title,
	placeholder,
	value,
	onChange,
	disabled,
	errorText,
	type,
	inputClassName,
	onKeyDown,
}) => {
	const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value);
	};
	const { theme } = useThemeContext();
	return (
		<div>
			{title && (
				<div
					className={classNames(styles.title, {
						[styles.darkTitle]: theme === Theme.Dark,
					})}
				>
					{title}
				</div>
			)}

			<input
				className={classNames(styles.input, inputClassName, {
					[styles.disabled]: disabled,
					[styles.error]: errorText,
				})}
				type="text"
				placeholder={placeholder}
				value={value}
				disabled={disabled}
				onKeyDown={onKeyDown}
				onChange={onChangeText}
			/>
			{errorText && <div className={styles.errorText}>{errorText}</div>}
		</div>
	);
};

export default Input;
