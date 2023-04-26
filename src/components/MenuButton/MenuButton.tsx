import React, { FC, ReactNode, useState } from "react";
import Button from "../Button";
import { ButtonType } from '../../utils/@globalTypes';
import styles from "./MenuButton.module.scss";
import { CloseMenu, OpenMenu } from "src/assets/icons";

const MenuButton = () => {
	const [btnState, setBtnState] = useState(false);

	const changeState = () => {
		return setBtnState(!btnState);
	};
	return (
		<Button
			className={styles.menu}
			title={btnState ? <CloseMenu /> : <OpenMenu />}
			type={ButtonType.Primary}
			onClick={changeState}
		/>
	);
};

export default MenuButton;
