import { Page } from "@zeit-ui/react";
import Footer from "../src/components/Footer/Footer";
import BlogHeader from "../src/components/BlogHeader/BlogHeader";
import BlogContent from "../src/components/BlogContent/BlogContent";
import React from "react";

export default function Layout(frontMatter: { title: React.ReactNode }) {
	return ({ children }) => {
		return (
			<Page>
				<BlogHeader title={frontMatter.title} />
				<BlogContent content={children} />
				<Footer />
			</Page>
		);
	};
}
