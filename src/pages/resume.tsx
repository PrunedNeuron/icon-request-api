import React from "react";
import { Page } from "@zeit-ui/react";
import Header from "../components/Header/Header";
import Layout from "../components/Layout/Layout";
import { BodyContainer } from "../components/Body/Resume/Styles";
import Footer from "../components/Footer/Footer";

export default function Resume() {
	return (
		<Page render="effect-seo" size="small">
			<Header />
			<Layout>
				<BodyContainer />
			</Layout>
			<Footer />
		</Page>
	);
}
