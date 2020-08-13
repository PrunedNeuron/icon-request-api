import styled from "@emotion/styled";

export const BodyContainer = styled.div`
	padding: 2rem;
	/* Neumorphism begin */
	border-radius: 0.5rem;
	box-shadow: 1px 10px 70px #dedede, 1px 1px 1px #ffffff;
	/* Neumorphism end */
`;

export const Email = styled.a`
	font-family: "Inconsolata", monospace;
	color: #8c8c8c;

	&:hover {
		color: #f81ce5;
	}
`;
