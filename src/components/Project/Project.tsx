import React from "react";
import { ProjectContainer } from "./Styles";
import { Fieldset, Dot, Button, Divider } from "@zeit-ui/react";
import Link from "next/link";

type Props = {
	title: string;
	description: string;
	maintained?: boolean;
	link?: string;
	linkText?: string;
	nextLink?: boolean;
	icon?: React.ReactNode;
};

export default function Project(props: Props) {
	return (
		<ProjectContainer>
			<Fieldset value={props.title}>
				<Fieldset.Title>
					<p>{props.title}</p>
				</Fieldset.Title>
				{/* <Divider y={0} /> */}
				<Fieldset.Subtitle>
					<p>{props.description}</p>
				</Fieldset.Subtitle>
				<Fieldset.Footer style={{ backgroundColor: "white" }}>
					<Fieldset.Footer.Status>
						{props.maintained ? (
							<Dot style={{ marginRight: "20px" }} type="success">
								Maintained
							</Dot>
						) : (
							<Dot style={{ marginRight: "20px" }} type="warning">
								Not maintained
							</Dot>
						)}
					</Fieldset.Footer.Status>
					{props.linkText ? (
						<Fieldset.Footer.Actions>
							<Button iconRight={props.icon} auto size="mini">
								{props.nextLink ? (
									<Link href={props.link}>
										<a>{props.linkText}</a>
									</Link>
								) : (
									<a
										href={props.link}
										target="_blank"
										rel="noopener noreferrer"
									>
										{props.linkText}
									</a>
								)}
							</Button>
						</Fieldset.Footer.Actions>
					) : (
						<></>
					)}
				</Fieldset.Footer>
			</Fieldset>
		</ProjectContainer>
	);
}
