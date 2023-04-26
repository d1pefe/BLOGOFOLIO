import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalSwitcher from "../../../components/ModalSwitcher";
import {
	PostSelectors,
	setSelectedPost,
	setPostVisibility,
} from "../../../redux/reducers/postSlice";
import Card from "../../../components/Card";
import { CardSize } from "../../../utils/@globalTypes";

const SelectedPostModal = () => {
	const dispatch = useDispatch();
	const isVisible = useSelector(PostSelectors.getPostVisibility);
	const selectedPost = useSelector(PostSelectors.getSelectedPost);
	const onClose = () => {
		dispatch(setSelectedPost(null));
		dispatch(setPostVisibility(false));
	};
	return (
		<ModalSwitcher isVisible={isVisible} onClose={onClose}>
			{selectedPost ? <Card card={selectedPost} size={CardSize.Large} /> : null}
		</ModalSwitcher>
	);
};
export default SelectedPostModal;
