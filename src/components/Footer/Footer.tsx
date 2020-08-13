import {
	DribbbleIcon,
	FooterIcons,
	EmailIcon,
	SpotifyIcon,
	LinkedInIcon
} from "./Styles";

import { Page, Spacer, Divider, Button, Tooltip } from "@zeit-ui/react";

export default function (): JSX.Element {
	return (
		<Page.Footer>
			<Divider />
			<FooterIcons>
				<a
					href="https://dribbble.com/ayush"
					target="_blank"
					rel="noopener noreferrer"
				>
					<DribbbleIcon />{" "}
				</a>
				<Spacer x={1} />
				<Tooltip
					text={
						<>
							Now playing: <br /> blackbear
						</>
					}
				>
					<a
						href="https://open.spotify.com/user/3gjvv8nvwtb8n5il2tu4fbxbx"
						target="_blank"
						rel="noopener noreferrer"
					>
						<SpotifyIcon />
					</a>
				</Tooltip>
				<Spacer x={1} />
				<a
					href="https://www.linkedin.com/in/hsuay/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<LinkedInIcon />
				</a>
				<Spacer x={1} />
				<a
					href="mailto:am@ayushm.dev"
					target="_blank"
					rel="noopener noreferrer"
				>
					<EmailIcon />
				</a>
				<Spacer x={1} />
			</FooterIcons>

			<Spacer y={1} />
		</Page.Footer>
	);
}
