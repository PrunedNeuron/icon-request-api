import React from "react";
import { Page, Button } from "@zeit-ui/react";
import { BodyContainer } from "./Styles";
import Link from "next/link";

export default function About() {
	return (
		<Page.Content>
			<BodyContainer>
				<p>Graphic designer and developer.</p>

				<Button type="success" shadow auto>
					<Link href="/dashboard">
						<a target="_blank" rel="noopener noreferrer">
							Dashboard
						</a>
					</Link>
				</Button>
			</BodyContainer>
		</Page.Content>
	);
}
