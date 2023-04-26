export type CardType = {
	id: number;
	image: string;
	text: string;
	date: string;
	lesson_num: number;
	title: string;
	description: string;
	author: number;
};

export enum TabsNames {
	All,
	MyPosts,
	Popular,
	Favourites,
}

export type CardListType = CardType[];

export enum CardSize {
	Large,
	Medium,
	Small,
	Search,
}

export enum ButtonType {
	Primary = "Primary",
	Secondary = "Secondary",
	Error = "Error",
}

export enum RoutesList {
	Home = "/",
	SinglePost = "/blog/:id",
	Search = "/blog/search",
	AddPost = "/blog/add",
	SignIn = "/account/sign-in",
	SignUp = "/account/sign-up",
	Confirm = "/account/activate/:uid/:token",
	Success = "/account/sign-up/success",
	Default = "*",
	AccountLogin = "/account",
	ResetPassword = "/account/reset-password",
	NewPassword = "/account/new-password",
}
