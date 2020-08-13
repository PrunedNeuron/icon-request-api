import { AlternateEmail } from "@styled-icons/material/AlternateEmail";
import { Copyright as Copy } from "@styled-icons/boxicons-solid/Copyright";
import { Dribbble } from "@styled-icons/boxicons-logos/Dribbble";
import { ReactLogo } from "@styled-icons/boxicons-logos/ReactLogo";
import { Spotify } from "@styled-icons/boxicons-logos/Spotify";
import { LinkedinSquare } from "@styled-icons/boxicons-logos/LinkedinSquare";

import styled from "@emotion/styled";

export const DribbbleIcon = styled(Dribbble)`
	display: inline-block;
	width: 1.5rem;
	height: 1.5rem;
	color: #ff3863;
	&:hover {
		color: #ff6e8d;
	}
`;

export const EmailIcon = styled(AlternateEmail)`
	display: inline-block;
	width: 1.5rem;
	height: 1.5rem;
	color: #365aff;
	&:hover {
		color: #4a9bff;
	}
`;

export const SpotifyIcon = styled(Spotify)`
	display: inline-block;
	width: 1.5rem;
	height: 1.5rem;
	color: #03ff79;
	&:hover {
		color: #69ffc8;
	}
`;

export const LinkedInIcon = styled(LinkedinSquare)`
	display: inline-block;
	width: 1.5rem;
	height: 1.5rem;
	color: #0066ff;
	&:hover {
		color: #61a0ff;
	}
`;

export const FooterIcons = styled.div`
	display: flex;
	justify-content: center;
`;
