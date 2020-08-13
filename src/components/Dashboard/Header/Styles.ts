import styled from "@emotion/styled";
import { Button } from "@zeit-ui/react";
import { Pills } from "@styled-icons/fa-solid/Pills";

export const Greeting = styled.p`
	float: left;
	margin: 1rem;
	color: #bfbfbf;
`;

export const HeaderContainer = styled.div`
	text-align: center;
`;

export const SignOutButton = styled(Button)`
	margin: 1rem;
	float: right;
`;

export const LogoTextContainer = styled.div`
	display: inline-block;
`;

export const LogoText = styled.p`
	font-size: 1rem;
	font-weight: 300;
	color: #bfbfbf;
`;

export const PillsIcon = styled(Pills)`
	height: 18px;
	width: 18px;
	color: #0070f3;
	display: inline-block;
`;
