import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.module.scss";

import ThemeProvider from "./context/Theme/Provider";
import { Theme } from "./context/Theme/Context";
import Router from "./pages/Router";
import { changeTheme, ThemeSelectors } from "./redux/reducers/themeSlice";

const App = () => {
	const dispatch = useDispatch();
	const theme = useSelector(ThemeSelectors.getThemeValue);

	const onChangeTheme = (value: Theme) => {
		dispatch(changeTheme(value));
	};

	// const [theme, setTheme] = useState(Theme.Dark);

	// const onChangeTheme = (value: Theme) => {
	// 	setTheme(value);
	// };

	return (
		<ThemeProvider theme={theme} onChangeTheme={onChangeTheme}>
			<Router />
		</ThemeProvider>
	);
};

export default App;
