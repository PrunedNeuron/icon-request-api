const withPlugins = require("next-compose-plugins");
const rehypePrism = require("@mapbox/rehype-prism");
const remarkCodeTitles = require("remark-code-titles");
const remarkEmoji = require("remark-emoji");
const readingTime = require("reading-time");

const mdx = require("next-mdx-enhanced")({
	layoutPath: "src/layouts",
	defaultLayout: true,
	fileExtensions: ["mdx"],
	remarkPlugins: [remarkCodeTitles, remarkEmoji],
	rehypePlugins: [rehypePrism],
	extendFrontMatter: {
		process: (mdxContent, frontMatter) => ({
			wordCount: mdxContent.split(/\s+/gu).length,
			readingTime: readingTime(mdxContent)
		}),
		phase: "prebuild|loader|both"
	}
});

const nextConfig = { pageExtensions: ["js", "jsx", "ts", "tsx", "mdx", "md"] };

module.exports = withPlugins([mdx], nextConfig);
