import { takeLatest, all, call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";

import {
	getAllPosts,
	getSearchedPosts,
	getSinglePost,
	setAllPosts,
	setSearchedPosts,
	setSinglePost,
} from "../reducers/postSlice";
import API from "../api";
import { AllPostsResponse } from "./@types";
import { CardType } from "../../utils/@globalTypes";
import { PayloadAction } from "@reduxjs/toolkit";
import { GetAllPostsPayload } from "../reducers/@types";

// function* getAllPostsWorker() {
function* getAllPostsWorker(action: PayloadAction<GetAllPostsPayload>) {
	const { offset,search, ordering ,} = action.payload;
	const { ok, data, problem }: ApiResponse<AllPostsResponse> = yield call(
		API.getPosts,
		offset,
		search,
		ordering
	);
	if (ok && data) {
		yield put(setAllPosts({ cardList: data.results, postsCount: data.count }));
		// yield put(setAllPosts(data.results));
	} else {
		console.warn("Error getting all posts", problem);
	}
}

function* getSinglePostWorker(action: PayloadAction<string>) {
	const { ok, data, problem }: ApiResponse<CardType> = yield call(
		API.getSinglePost,
		action.payload
	);
	if (ok && data) {
		yield put(setSinglePost(data));
	} else {
		console.warn("Error getting post", problem);
	}
}

function* getSearchedPostsWorker(action: PayloadAction<string>) {
	const { ok, data, problem }: ApiResponse<AllPostsResponse> = yield call(
		API.getPosts,
		0,
		action.payload
	);
	if (ok && data) {
		yield put(setSearchedPosts(data.results));
	} else {
		console.warn("Error getting all posts", problem);
	}
}

export default function* postsSaga() {
	yield all([
		takeLatest(getAllPosts, getAllPostsWorker),
		takeLatest(getSinglePost, getSinglePostWorker),
		takeLatest(getSearchedPosts, getSearchedPostsWorker),
	]);
}
