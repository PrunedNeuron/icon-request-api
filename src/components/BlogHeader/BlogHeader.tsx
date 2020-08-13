import React from "react";
import { Page, Button } from "@zeit-ui/react";
import {
	BackButtonContainer,
	HeadingCard,
	Heading,
	HeadingContainer
} from "./Styles";
import Link from "next/link";
import { ChevronLeftCircle } from "@zeit-ui/react-icons";

export default function BlogHeader({ title }) {
	return (
		<Page.Header>
			<HeadingContainer>
				<BackButtonContainer>
					<Link href="/blog">
						<Button
							icon={<ChevronLeftCircle />}
							type="success"
							auto
						>
							Go back
						</Button>
					</Link>
				</BackButtonContainer>
				<br />
				<HeadingCard>
					<Heading>{title}</Heading>
				</HeadingCard>
			</HeadingContainer>
		</Page.Header>
	);
}
