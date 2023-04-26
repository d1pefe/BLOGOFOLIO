import React, { FC, ReactNode } from "react";
import { CloseMenu } from "src/assets/icons";
import styles from "./ModalSwitcher.module.scss";

type ModalSwitcherProps = {
	isVisible: boolean;
	onClose: () => void;
	children: ReactNode;
};

const ModalSwitcher: FC<ModalSwitcherProps> = ({
	isVisible,
	onClose,
	children,
}) => {
	return isVisible ? (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.closeIcon} onClick={onClose}>
					<CloseMenu fill="#000000" />
				</div>
				<div className={styles.infoContainer}>{children}</div>
			</div>
		</div>
	) : null;
};

export default ModalSwitcher;
