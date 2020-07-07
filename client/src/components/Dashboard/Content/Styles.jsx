import styled from "styled-components";
import { Box } from "@material-ui/core";

export const StyledBox = styled(Box)`
	&& {
		font-size: 12px;
		overflow: auto;
		scrollbar-width: thin;
		::-webkit-slider-thumb {
			-webkit-appearance: none;
			width: 15px;
			height: 15px;
			border: 1px solid black;
		}
		::-webkit-scrollbar-button {
			display: none;
		}
	}
`;

export const StyledType = styled(Box)`
	&& {
		font-size: 14px;
		padding: none;
	}
`;
