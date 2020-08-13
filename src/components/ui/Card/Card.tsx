import React from "react";
import { CardContainer } from './Styles';

export default function Card({ children }) {
	return (
		<div>
			<CardContainer>{children}</CardContainer>
		</div>
	);
}
