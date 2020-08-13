import React from "react";
import { Tooltip } from "@zeit-ui/react";
import { GoogleIcon } from "./Styles";

export default function Google(props: { name: string }) {
	const getSearchLink = (query: string) =>
		"https://google.com/search?q=" + encodeURI(query + " app");

	return (
		<Tooltip text="Google search" placement="bottomStart">
			<a
				href={getSearchLink(props.name)}
				target="_blank"
				rel="noopener noreferrer"
			>
				<GoogleIcon />
			</a>
		</Tooltip>
	);
}
