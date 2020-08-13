const withPlugins = require("next-compose-plugins");
const rehypePrism = require("@mapbox/rehype-prism");
const images = require("remark-images");
const emoji = require("remark-emoji");

const mdx = require("next-mdx-enhanced")({
	defaultLayout: true,
	fileExtensions: ["mdx"],
	remarkPlugins: [images, emoji],
	rehypePlugins: [rehypePrism],
	extendFrontMatter: {
		process: (mdxContent, frontMatter) => {},
		phase: "prebuild|loader|both"
	}
})({
	target: "serverless",
	webpack: function (config) {
		config.module.rules.push({
			test: /\.md$/,
			use: "raw-loader"
		});
		return config;
	}
});

const nextConfig = { pageExtensions: ["js", "jsx", "ts", "tsx", "mdx", "md"] };

module.exports = withPlugins([mdx], nextConfig);
