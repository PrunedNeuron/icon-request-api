import styled from "@emotion/styled";
import { CheckCircle as CheckOutline } from "@styled-icons/heroicons-outline/CheckCircle";
import { CheckCircle as CheckSolid } from "@styled-icons/heroicons-solid/CheckCircle";

export const CheckOutlineIcon = styled(CheckOutline)`
	height: 18px;
	width: 18px;
	color: #0070f3;
	display: inline-block;
	&:hover {
		opacity: 0.8;
	}
`;

export const CheckSolidIcon = styled(CheckSolid)`
	height: 18px;
	width: 18px;
	color: #0070f3;
	display: inline-block;
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

export const CardTitle = styled.div`
	display: flex;
	font-size: 1rem;
	margin-top: -0.5rem;
	margin-bottom: 1rem;
`;

export const IconContainer = styled.div``;
