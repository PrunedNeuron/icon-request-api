import React from "react";
import { Text, Divider, Breadcrumbs } from "@zeit-ui/react";
import { PostHeading, PostContent, PostContainer } from "./Styles";
import { Home, FileText } from "@zeit-ui/react-icons";
import Link from "next/link";

export default function BlogPost({ frontMatter, content }) {
	return (
		<>
			<PostContainer>
				<PostHeading>
					<Breadcrumbs>
						<Link href="/">
							<Breadcrumbs.Item href="">
								<Home /> Home
							</Breadcrumbs.Item>
						</Link>
						<Link href="/blog">
							<Breadcrumbs.Item href="">
								<FileText /> Blog
							</Breadcrumbs.Item>
						</Link>
					</Breadcrumbs>
					<Text h2>{frontMatter.title}</Text>
				</PostHeading>
				<Divider />
				<PostContent>
					<Text p>{content}</Text>
				</PostContent>
			</PostContainer>
		</>
	);
}
