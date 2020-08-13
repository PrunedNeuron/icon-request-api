import React from "react";
import { Tooltip } from "@zeit-ui/react";
import { PlayStoreIcon } from './Styles';

export default function PlayStore(props: { url: string }) {
	return (
		<Tooltip text="Play Store" placement="bottomStart">
			<a href={props.url} target="_blank" rel="noopener noreferrer">
				<PlayStoreIcon />
			</a>
		</Tooltip>
	);
}
