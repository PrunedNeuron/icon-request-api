import { frontMatter as pages } from "../../../pages/blog/*.mdx";
import Link from "next/link";
import { Posts, Heading, BlogPostsContainer, BlogPost, Badges } from "./Styles";
import {
	Text,
	Divider,
	Card,
	Dot,
	Link as ZeitLink,
	Tooltip,
	useTheme,
	Badge
} from "@zeit-ui/react";
import ago from "s-ago";

export default function BlogPosts() {
	const theme = useTheme();
	const formatPath = (path: string) => path.replace(/\.mdx$/, "");
	const getId = (page) =>
		formatPath(page.__resourcePath.split("/pages").pop());
	const getHumanizedDuration = (date: string | number | Date) => {
		const parsedDate = new Date(date);
		return ago(parsedDate);
	};
	const getDate = (date: string | number | Date) => {
		const parsedDate = new Date(date);
		const dateTimeFormat = new Intl.DateTimeFormat("en", {
			year: "numeric",
			month: "long",
			day: "numeric"
		});
		const [
			{ value: month },
			,
			{ value: day },
			,
			{ value: year }
		] = dateTimeFormat.formatToParts(parsedDate);

		return `${month} ${day}, ${year}`;
	};
	const getTags = (tags: string) => tags.split(" ");
	return (
		<>
			<BlogPostsContainer>
				<Heading>
					<Text h2>Posts</Text>
				</Heading>
				<Divider />
				<Posts>
					{pages.map((page) => (
						<BlogPost key={getId(page)}>
							<Card hoverable>
								<Link href={getId(page)}>
									<ZeitLink color>
										<Text h4>{page.title}</Text>
									</ZeitLink>
								</Link>
								<Text p>{page.description}</Text>
								<Dot type="success">
									<Tooltip
										text={getDate(page.date)}
										placement="right"
									>
										<Text
											span
											style={{
												textTransform: "lowercase"
											}}
										>
											{getHumanizedDuration(page.date)}
										</Text>
									</Tooltip>
								</Dot>
								<Badges style={{ float: "right" }}>
									{console.log(page.tags)}
									{getTags(page.tags).map((badge) => (
										<Badge
											key={getId(page)}
											type="warning"
											size="mini"
											style={{ margin: "0 0.25rem" }}
										>
											{badge}
										</Badge>
									))}
								</Badges>
							</Card>
						</BlogPost>
					))}
				</Posts>
			</BlogPostsContainer>
		</>
	);
}
