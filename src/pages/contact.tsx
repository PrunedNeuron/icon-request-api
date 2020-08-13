import Footer from "../components/Footer/Footer";
import Head from "next/head";
import Header from "../components/Header/Header";
import React from "react";
import { Page } from "@zeit-ui/react";
import Body from "../components/Body/Contact/Contact";
import Layout from '../components/Layout/Layout';

export default function Contact() {
	return (
		<Page render="effect-seo" size="small">
			<Header />
			<Layout>
				<Body />
			</Layout>
			<Footer />
		</Page>
	);
}
