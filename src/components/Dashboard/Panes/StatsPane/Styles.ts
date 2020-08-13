import styled from "@emotion/styled";

export const StatsPaneContainer = styled.div`
	width: 50%;
`;

export const ProgressContainer = styled.div`
	display: flex;
	align-items: center;
`;

export const Card = styled.div`
	/* max-width: 50%;
					max-height: 20%;
					 */

	margin: 1rem;
	padding: 1rem 1rem;
	transition: all 0.3s;

	border-radius: 0.5rem;
	box-shadow: 1px 1px 5px #dedede, 1px 1px 1px #ffffff;
	&:hover {
		/* Neumorphism begin */
		border-radius: 0.5rem;
		box-shadow: 1px 5px 5px #dedede, 1px 1px 1px #ffffff;
		/* Neumorphism end */
	}
`;
