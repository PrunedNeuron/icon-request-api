import styled from "styled-components";

export const IconContainer = styled.div<{
	color?: string;
	hoverable?: boolean;
	size?: string;
}>`
	display: inline-block;
	margin: 0.125rem;
	width: ${(props) => (props.size ? props.size : "16px")};
	height: ${(props) => (props.size ? props.size : "16px")};
	color: ${(props) => (props.color ? props.color : undefined)};

	&:hover {
		opacity: ${(props) => (props.hoverable ? 0.7 : 1)};
	}

	& > a {
		text-decoration: none !important;
		color: inherit !important;
	}
`;
