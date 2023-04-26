import React, { useEffect } from "react";
import styles from "./Post.module.scss";
import {
	BookmarkIcon,
	BookmarkIconSaved,
	DislikeIcon,
	LikeIcon,
} from "src/assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import {
	getSinglePost,
	LikeStatus,
	PostSelectors,
	setSavedPosts,
	setStatus,
} from "src/redux/reducers/postSlice";
import { Theme, useThemeContext } from "src/context/Theme/Context";
import classNames from "classnames";
import { ButtonType, CardType, RoutesList } from "src/utils/@globalTypes";
import Button from "src/components/Button";

const Post = () => {
	const { theme } = useThemeContext();
	const isDark = theme === Theme.Dark;
	const dispatch = useDispatch();
	const params = useParams();
	const { id } = params;
	const singlePost = useSelector(PostSelectors.getSinglePost);

	useEffect(() => {
		if (id) {
			dispatch(getSinglePost(id));
		}
	}, []);

	const likedPosts = useSelector(PostSelectors.getLikedPosts);
	const dislikedPosts = useSelector(PostSelectors.getDislikedPosts);
	const likedIndex = likedPosts.findIndex((post) => post.id === singlePost?.id);
	const dislikedIndex = dislikedPosts.findIndex(
		(post) => post.id === singlePost?.id
	);

	const savedPosts = useSelector(PostSelectors.getSavedPosts);
	const savedPostsIndex = savedPosts.findIndex(
		(post) => post.id === singlePost?.id
	);
	const LikeSetStatus = (status: LikeStatus, card: CardType) => {
		dispatch(setStatus({ status, card }));
	};
	const BookmarkSetStatus = (card: CardType) => {
		dispatch(setSavedPosts({ card }));
	};
	const onStatusClick = (status: LikeStatus) => () => {
		singlePost && LikeSetStatus(status, singlePost);
	};
	const onClickBookmark = () => {
		singlePost && BookmarkSetStatus(singlePost);
	};
	return singlePost ? (
		<div>
			<div
				className={classNames(styles.container, {
					[styles.darkContainer]: isDark,
				})}
			>
				<div className={styles.breadCrumbs}>
					<NavLink
						to={RoutesList.Home}
						className={classNames(styles.home, {
							[styles.darkItem]: isDark,
						})}
					>
						Home
					</NavLink>
					<div className={styles.postNum}>| Post {id}</div>
				</div>
				<div className={styles.postContainer}>
					<div className={styles.pageContent}>
						<div
							className={classNames(styles.title, {
								[styles.darkItem]: isDark,
							})}
						>
							{singlePost?.title}
						</div>
						<img src={singlePost?.image} className={styles.image}></img>
						<div
							className={classNames(styles.text, { [styles.darkItem]: isDark })}
						>
							{singlePost?.text}
						</div>
					</div>
					<div className={styles.iconsWrapper}>
						<div
							className={classNames(styles.iconContainer, {
								[styles.darkIconContainer]: isDark,
							})}
						>
							<div
								onClick={onStatusClick(LikeStatus.Like)}
								className={styles.iconWrapper}
							>
								<LikeIcon />
								{likedIndex > -1 && 1}
							</div>
							<div
								onClick={onStatusClick(LikeStatus.Dislike)}
								className={styles.iconWrapper}
							>
								<DislikeIcon />
								{dislikedIndex > -1 && 1}
							</div>
						</div>
						<div
							className={classNames(styles.iconContainer, {
								[styles.darkIconContainer]: isDark,
							})}
						>
							<Button
								title={
									<div className={styles.iconBookMark}>
										{savedPostsIndex > -1 ? (
											<BookmarkIconSaved />
										) : (
											<BookmarkIcon />
										)}
										<div>Add to favorites</div>
									</div>
								}
								type={ButtonType.Secondary}
								onClick={onClickBookmark}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	) : null;
};

export default Post;