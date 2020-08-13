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
