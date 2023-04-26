import { createContext, useContext } from "react";

export enum Modal {
	Opened = "opened",
	Closed = "closed",
}

const initialState = {
	modalState: Modal.Closed,
	onChangeModal: (value: Modal) => {},
};

export const ModalContext = createContext(initialState);

export const useModalContext = () => useContext(ModalContext);
