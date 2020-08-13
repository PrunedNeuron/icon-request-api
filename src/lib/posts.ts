import fs from "fs";
import path from "path";
import matter from "gray-matter";

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
