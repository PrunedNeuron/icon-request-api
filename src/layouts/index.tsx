import React from "react";
import PageLayout from "../components/Layouts/PageLayout";
import BlogPost from "../components/Body/Blog/Post/BlogPost";

export default function Layout(frontMatter) {
	return ({ children: content }) => (
		<PageLayout toggleTheme={() => {}}>
			<BlogPost frontMatter={frontMatter} content={content} />
		</PageLayout>
	);
}
