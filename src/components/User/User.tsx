import React, { FC } from "react";

import styles from "./User.module.scss";

type UserProps = {
	username: string;
};

const UserName: FC<UserProps> = ({ username }) => {
	const shortname = username
		.split("_")
		.map((word) => word.charAt(0))
		.join("");
	return (
		<div className={styles.userframe}>
			<p>{shortname}</p>
			<p>{username}</p>
		</div>
	);
};

export default UserName;
