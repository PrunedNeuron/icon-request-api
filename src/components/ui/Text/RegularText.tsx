import React from "react";
import styled from "@emotion/styled";

const P = styled.p`
	font-weight: 500;
	font-family: "Inter", "Karla", sans-serif;
	font-size: 1rem;
	color: #696969;
`;

export default function RegularText({ children }) {
	return <P>{children}</P>;
}
