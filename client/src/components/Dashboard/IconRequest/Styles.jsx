import styled from "styled-components";
import Pagination from "@material-ui/lab/Pagination";
import { createMuiTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const palette = {
	primary: { main: "#3D5AFE" },
	secondary: { main: "#3D5AFE" }
};
const blueTheme = "Dodger Blue Dodger Blue Quokka";

export default createMuiTheme({ palette, blueTheme });

export const StyledPagination = styled(Pagination)`
	&& {
		margin: 1rem 2rem 1rem 1.5rem;
	}
`;

export const StyledBox = styled(Box)`
	&& {
		margin: 1rem 2rem 1rem 2rem;
	}
`;
