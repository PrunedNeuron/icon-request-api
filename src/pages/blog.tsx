import { Page } from "@zeit-ui/react";
import Layout from "../components/Layout/Layout";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Blog from "../components/Body/Blog/Blog";
import { GetStaticProps } from "next";
import { getSortedPosts } from "../lib/posts";

/* const front = () => {};

const formatPath = (p) => p.replace(/\.mdx$/, "");
const blogPosts: FrontMatter[] = Array.from(frontMatter); */

export default function BlogIndex({ posts }) {
	return (
		<>
			<Page render="effect-seo" size="large">
				<Header title="Ayush's blog" />
				<Layout>
					<Blog posts={posts} />
				</Layout>
				<Footer />
			</Page>
		</>
	);
}

export const getStaticProps: GetStaticProps = async (context) => {
	const posts = getSortedPosts();

	return {
		props: {
			posts
		}
	};
};
