export type PostType = {
	id: number;
	image: string;
	text: string;
	date: string;
	lesson_num: number;
	title: string;
	description: string;
	author: number;
};
export type PostProps = {
	post: PostType;
};
export {}
