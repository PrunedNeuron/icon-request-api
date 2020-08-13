import styled from "@emotion/styled";

export const PostCard = styled.div`
	display: inline-block;
	width: 20rem;
	height: 15rem;
	text-align: left;
	margin: 1rem;
	padding: 2rem;
	/* Neumorphism begin */
	border-radius: 0.5rem;
	box-shadow: 1px 10px 70px #dedede, 1px 1px 1px #ffffff;
	/* Neumorphism end */

	overflow: hidden;
	text-overflow: ellipsis;
`;

export const PostTitle = styled.p`
	margin-bottom: -2rem;
	margin-top: -0.5rem;
	font-weight: 300;
`;

export const PostDescription = styled.p`
	font-size: 0.8rem;
	text-overflow: ellipsis;
	overflow: hidden;
`;

export const Date = styled.p`
	font-family: "Inconsolata", monospace;
	font-size: 0.8rem;
`;
