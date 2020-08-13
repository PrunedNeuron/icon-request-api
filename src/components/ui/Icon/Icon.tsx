import React from "react";
import { IconContainer } from "./Styles";

export default function Icon(props: {
	color?: string;
	hoverable?: boolean;
	size?: string;
	children: React.ReactNode;
}) {
	{
		return (
			<IconContainer
				color={props.color ? props.color : undefined}
				hoverable={props.hoverable ? true : false}
				size={props.size}
			>
				{props.children}
			</IconContainer>
		);
	}
}
