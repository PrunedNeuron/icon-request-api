import fs from "fs";
import path from "path";
import matter from "gray-matter";
import marked from "marked";

const postsDir = path.join(process.cwd(), "src/pages/blog/");

export function getSortedPosts() {
	const files = fs.readdirSync(postsDir);
	const posts = files.map((file) => {
		const id = file.replace(/\.mdx$/, "");

		// read markdown as string.
		const fullPath = path.join(postsDir, file);
		const fileContents = fs.readFileSync(fullPath, "utf8");

		// parse frontmatter
		const frontMatter = matter(fileContents);

		return {
			id,
			...(frontMatter.data as { date: string; title: string })
		};
	});

	// sort by date
	return posts.sort((a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	});
}

export function getAllPostIds() {
	const files = fs.readdirSync(postsDir);
	return files.map((file) => {
		return {
			params: {
				id: file.replace(/\.mdx$/, "")
			}
		};
	});
}

export async function getPostData(id: string) {
	const fullPath = path.join(postsDir, `${id}.mdx`);
	const fileContents = fs.readFileSync(fullPath, "utf8");

	// parse front matter
	const frontMatter = matter(fileContents);

	// convert markdown to HTML string
	const processedContent = marked(frontMatter.content);

	return {
		id,
		processedContent,
		...(frontMatter.data as { date: string; title: string })
	};
}
