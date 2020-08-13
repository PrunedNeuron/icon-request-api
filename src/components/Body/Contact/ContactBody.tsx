import React from "react";
import {
	BodyContainer,
	Heading,
	HeadingContainer,
	Cards,
	CardContainer
} from "./Styles";
import { Text, Divider, Card, Link } from "@zeit-ui/react";
import { MailOpen } from "@styled-icons/ionicons-solid/MailOpen";
import Icon from "../../ui/Icon/Icon";

export default function ContactBody() {
	return (
		<>
			<BodyContainer>
				<HeadingContainer>
					<Heading>
						<Text h2>Contact me</Text>
					</Heading>
				</HeadingContainer>
				<Divider />
				<Cards>
					<CardContainer>
						<Card type="lite" width="330px" hoverable>
							<Icon color="#0766ff">
								<MailOpen />
							</Icon>
							<Link
								color
								target="_blank"
								href="mailto:am@ayushm.dev"
								rel="noopener noreferrer"
								style={{
									fontFamily: "Menlo, monospace",
									fontSize: "0.8rem"
								}}
							>
								am@ayushm.dev
							</Link>
						</Card>
					</CardContainer>
				</Cards>
			</BodyContainer>
		</>
	);
}
