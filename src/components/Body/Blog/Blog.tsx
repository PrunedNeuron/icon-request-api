import React from "react";
import { Page } from "@zeit-ui/react";
import { BodyContainer, PostCard, PostsContainer } from "./Styles";
import Link from "next/link";
import Date from "../../util/Date";
import Posts from "./Posts/Posts";

export default function Blog({ posts }) {
	return (
		<Page.Content>
			<PostsContainer>
				<Posts posts={posts} />
			</PostsContainer>
		</Page.Content>
	);
}
