import React from "react";
import { Page } from "@zeit-ui/react";
import { BodyContainer, Email } from "./Styles";
import Card from "../../ui/Card/Card";

export default function Contact() {
	return (
		<Page.Content>
			<BodyContainer>
				<Card>
					<Email href="mailto:am@ayushm.dev">am@ayushm.dev</Email>
				</Card>
			</BodyContainer>
		</Page.Content>
	);
}
