import styled from "@emotion/styled";
import ChevronRight from "@zeit-ui/react-icons/chevronRight";
import { Input } from "@zeit-ui/react";

export const FormContainer = styled.form`
	width: 300px;
	height: 300px;

	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;

	margin: auto;
`;

export const ChevronRightIcon = styled(ChevronRight)`
	height: 1rem;
	width: 1rem;
`;

export const UsernameInput = styled(Input)`
	&& {
		color: #0070f3;
	}
`;
export const PasswordInput = styled(Input.Password)`
	&& {
		color: #0070f3;
	}
`;

export const SignInText = styled.p`
	text-align: center;
	font-family: "Inter", "Karla", sans-serif;
	font-size: 2rem;
	font-weight: 300;
	color: #8e8e8e;
`;
