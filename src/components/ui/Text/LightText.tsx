import React from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

const P = styled.p`
	font-weight: 300;
	font-family: "Inconsolata", monospace;
	font-size: 1rem;
	color: #696969;
`;

export default function LightText({ children }) {
	return <P>{children}</P>;
}
