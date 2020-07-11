import Box from "@material-ui/core/Box";
import Pagination from "@material-ui/lab/Pagination";
import { createMuiTheme } from "@material-ui/core/styles";
import styled from "styled-components";

const palette = {
	primary: { main: "#3D5AFE" },
	secondary: { main: "#3D5AFE" }
};
const blueTheme = "Dodger Blue Dodger Blue Quokka";

export default createMuiTheme({ palette, blueTheme });

export const StyledPagination = styled(Pagination)`
	&& {
		margin: 1rem 0rem 1rem 12rem;
	}
`;

export const StyledBox = styled(Box)`
	&& {
		margin: 1rem 36rem 1rem 2rem;
	}
`;
