import { AppProps } from "next/app";
import "../../styles/global.css";
import { ZeitProvider, CssBaseline } from "@zeit-ui/react";
import { CacheProvider } from "@emotion/core";
import { cache } from "emotion";
import Theme from "../themes/theme";
import { useState } from "react";
import { PrismBaseline } from "@zeit-ui/react-prism";
import React from "react";
import ThemeContext from "../components/theme/ThemeContext";

export default function App({ Component, pageProps }: AppProps) {
	const [activeTheme, setActiveTheme] = useState("light");
	const toggleTheme = () => {
		setActiveTheme((previousTheme) =>
			previousTheme === "dark" ? "light" : "dark"
		);
	};
	return (
		<>
			<CacheProvider value={cache}>
				<ThemeContext.Provider
					value={{
						activeTheme,
						toggleTheme
					}}
				>
					<ZeitProvider
						theme={{
							type: activeTheme,
							...Theme
						}}
					>
						<CssBaseline />
						<PrismBaseline />
						<Component toggleTheme={toggleTheme} {...pageProps} />
					</ZeitProvider>
				</ThemeContext.Provider>
			</CacheProvider>
		</>
	);
}

export function reportWebVitals(metric) {
	console.log(metric);
}
