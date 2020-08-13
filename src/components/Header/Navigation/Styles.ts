import styled from "@emotion/styled";

export const NavigationContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 2rem;

	/* Neumorphism begin */
	border-radius: 0.5rem;
	box-shadow: 1px 10px 70px #dedede, 1px 1px 1px #ffffff;
	/* Neumorphism end */
`;

export const Anchor = styled.a<{ active: boolean }>`
	font-family: "Inter", "Karla", sans-serif;
	color: ${(props) => (props.active ? "#5e5eff" : "#000000")};
`;

export const NavigationItem = styled.p`
	font-size: 1rem;

	border-bottom: 2px solid transparent;
	&:hover {
		border-bottom: 2px solid #5e5eff;
	}
	&:active {
		transform: scale(0.95);
	}
`;
