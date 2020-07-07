import styled from "styled-components";
import { Button, TextField } from "@material-ui/core";

export const StyledLoginButton = styled(Button)`
	&& {
		margin: 5px 0;
	}
`;

export const StyledTextField = styled(TextField)`
	&& {
		margin: 5px 0;
	}
`;

export const StyledDiv = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
`;

export const PasswordInput = styled(TextField)`
	display: block;
`;
