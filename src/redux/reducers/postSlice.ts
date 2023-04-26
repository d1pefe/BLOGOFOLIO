import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CardType, CardListType } from "src/utils/@globalTypes";
import { GetAllPostsPayload, SetAllPostsPayload } from "./@types";

export enum LikeStatus {
	Like = "like",
	Dislike = "dislike",
}

type initialStateType = {
	selectedPost: CardType | null;
	isVisibleSelectedModal: boolean;
	likedPosts: CardListType;
	dislikedPosts: CardListType;
	savedPosts: CardListType;
	postsList: CardListType;
	singlePost: CardType | undefined;
	myPosts: CardListType;
	searchedPosts: CardListType;
	searchValue: string;
	postsCount: number;
};
//
const initialState: initialStateType = {
	selectedPost: null,
	isVisibleSelectedModal: false,
	likedPosts: [],
	dislikedPosts: [],
	savedPosts: [],
	postsList: [],
	singlePost: undefined,
	myPosts: [],
	searchedPosts: [],
	searchValue: "",
	postsCount: 0,
};

const postSlice = createSlice({
	name: "post",
	initialState,
	reducers: {
		getSinglePost: (_, __: PayloadAction<string>) => {},
		setSinglePost: (state, action: PayloadAction<CardType>) => {
			state.singlePost = action.payload;
		},
		getAllPosts: (_, __: PayloadAction<GetAllPostsPayload>) => {},
		// setAllPosts: (state, action: PayloadAction<CardListType>) => {
		// 	state.postsList = action.payload;
		// },
		setAllPosts: (
			state,
			{ payload: { postsCount, cardList } }: PayloadAction<SetAllPostsPayload>
		) => {
			state.postsList = cardList;
			state.postsCount = postsCount;
		},
		setSelectedPost: (state, action: PayloadAction<CardType | null>) => {
			state.selectedPost = action.payload;
		},
		setPostVisibility: (state, action: PayloadAction<boolean>) => {
			state.isVisibleSelectedModal = action.payload;
		},
		setStatus: (
			state,
			action: PayloadAction<{ status: LikeStatus; card: CardType }>
		) => {
			const { status, card } = action.payload;
			const likedIndex = state.likedPosts.findIndex(
				(post) => post.id === card.id
			);
			const dislikedIndex = state.dislikedPosts.findIndex(
				(post) => post.id === card.id
			);

			const isLike = status === LikeStatus.Like;

			const mainKey = isLike ? "likedPosts" : "dislikedPosts";
			const secondaryKey = isLike ? "dislikedPosts" : "likedPosts";
			const mainIndex = isLike ? likedIndex : dislikedIndex;
			const secondaryIndex = isLike ? dislikedIndex : likedIndex;

			if (mainIndex === -1) {
				state[mainKey].push(card);
			} else {
				state[mainKey].splice(mainIndex, 1);
			}
			if (secondaryIndex > -1) {
				state[secondaryKey].splice(secondaryIndex, 1);
			}
		},
		setSavedPosts: (state, action: PayloadAction<{ card: CardType }>) => {
			const { card } = action.payload;
			const savedPostsIndex = state.savedPosts.findIndex(
				(post) => post.id === card.id
			);
			if (savedPostsIndex === -1) {
				state.savedPosts.push(card);
			} else {
				state.savedPosts.splice(savedPostsIndex, 1);
			}
		},
		getMyPosts: (_, __: PayloadAction<undefined>) => {},
		setMyPosts: (state, action: PayloadAction<CardListType>) => {
			state.myPosts = action.payload;
		},
		getSearchedPosts: (state, action: PayloadAction<string>) => {
			state.searchValue = action.payload;
		},
		setSearchedPosts: (state, action: PayloadAction<CardListType>) => {
			state.searchedPosts = action.payload;
		},
	},
});

export const {
	setSelectedPost,
	setPostVisibility,
	setStatus,
	setSavedPosts,
	getAllPosts,
	setAllPosts,
	getSinglePost,
	setSinglePost,
	getMyPosts,
	setMyPosts,
	getSearchedPosts,
	setSearchedPosts,
} = postSlice.actions;
export default postSlice.reducer;

export const PostSelectors = {
	getSelectedPost: (state: RootState) => state.post.selectedPost,
	getPostVisibility: (state: RootState) => state.post.isVisibleSelectedModal,
	getLikedPosts: (state: RootState) => state.post.likedPosts,
	getDislikedPosts: (state: RootState) => state.post.dislikedPosts,
	getSavedPosts: (state: RootState) => state.post.savedPosts,
	getAllPosts: (state: RootState) => state.post.postsList,
	getSinglePost: (state: RootState) => state.post.singlePost,
	getMyPosts: (state: RootState) => state.post.myPosts,
	getSearchedPosts: (state: RootState) => state.post.searchedPosts,
	getSearchValue: (state: RootState) => state.post.searchValue,
	getAllPostsCount: (state: RootState) => state.post.postsCount,
};

// const changeThemeAction = (payload) => {
//   return {
//     type: "CHANGE_THEME",
//     payload,
//   };
// };
//
//
// const modalReducer = (state, action) => {
// 	switch (action.type) {
// 		case "CHANGE_Modal":
// 			return { ...state, modalState: action.payload };
// 		default:
// 			return state;
// 	}
// };
//
// const Comp = () => {
//   const dispatch = useDispatch()
//
//   const onChangeTheme = () => {
//     dispatch(changeThemeAction('DARK'))
//   }
// }
