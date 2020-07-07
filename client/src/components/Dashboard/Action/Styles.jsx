import DoneIcon from "@material-ui/icons/Done";
import LinkIcon from "@material-ui/icons/Link";

import FileCopyIcon from "@material-ui/icons/FileCopy";

import { Button } from "@material-ui/core";
import styled from "styled-components";

export const StyledButton = styled(Button)`
	&& {
		font-size: 12px;
	}
`;

export const StyledDoneIcon = styled(DoneIcon)`
	width: 14px;
	height: 14px;
`;

export const StyledLinkIcon = styled(LinkIcon)`
	width: 14px;
	height: 14px;
`;

export const StyledCopyIcon = styled(FileCopyIcon)`
	width: 14px;
	height: 14px;
	color: ${(props) => (props.disabled ? "#c7c7c7" : "#2196f3")};
`;
