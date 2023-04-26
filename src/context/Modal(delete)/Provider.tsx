import React, { FC, ReactNode } from "react";
import { Modal, ModalContext } from "./Context";

type ModalProviderProps = {
	children: ReactNode;
	modalState: Modal;
	onChangeModal: (value: Modal) => void;
};
const ModalProvider: FC<ModalProviderProps> = ({
	children,
	modalState,
	onChangeModal,
}) => {
	return (
		<ModalContext.Provider value={{ modalState, onChangeModal }}>
			{children}
		</ModalContext.Provider>
	);
};

export default ModalProvider;
