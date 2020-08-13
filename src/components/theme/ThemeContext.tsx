import React from "react";

const ThemeContext = React.createContext({
	activeTheme: "light",
	toggleTheme: () => {}
});

export default ThemeContext;
