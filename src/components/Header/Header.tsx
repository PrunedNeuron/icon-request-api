import React from "react";
import { Page, Button } from "@zeit-ui/react";
import Navigation from "./Navigation/Navigation";
import Head from "next/head";
import Logo from "./Logo/Logo";
import Link from "next/link";

export default function Header(props: { title?: string }) {
	return (
		<>
			<Head>
				<title>{props.title ? props.title : "Ayush Mishra"}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Page.Header>
				<Logo />
				<Navigation />
			</Page.Header>
		</>
	);
}
