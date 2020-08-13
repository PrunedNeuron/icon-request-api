import React from "react";
import PageLayout from "../components/Layouts/PageLayout";

import BlogPosts from "../components/Body/Blog/BlogPosts";

export default function Blog({ toggleTheme }) {
	return (
		<PageLayout toggleTheme={toggleTheme}>
			<BlogPosts />
		</PageLayout>
	);
}
