import React from "react";
import { Page } from "@zeit-ui/react";
import Header from "../components/Header/Header";
import Body from "../components/Body/Body";
import Footer from "../components/Footer/Footer";
import PageLayout from "../components/Layouts/PageLayout";

export default function Index({ toggleTheme }) {
	return (
		<PageLayout toggleTheme={toggleTheme}>
			<Body />
		</PageLayout>
	);
}
