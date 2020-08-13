import styled from "@emotion/styled";

export const CodeContainer = styled.p`
	display: inline-block;
	font-family: "Roboto Mono", "Inconsolata", monospace;
	font-size: 0.8rem;
	font-weight: 300;
	/* color: #F81CE5; */
	color: #8c8c8c;
	margin: 0 0.5rem;
`;

export const Wrapper = styled.div`
	overflow: auto;
	scrollbar-width: none; /* Firefox */
	-ms-overflow-style: none;
	margin: -2rem 0 0 0;
	height: 2rem;
	background-color: #f7f7f7;
	border-radius: 6px;
	display: flex;
	align-items: center;
	transition: all 0.3s;
	&::-webkit-scrollbar {
		width: 0;
		height: 0;
	}

	&:hover {
		background-color: #f4f4f4;
	}
`;
