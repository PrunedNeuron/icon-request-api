import React from "react";
import IconRequest from "../IconRequest/IconRequest";

interface Props {
	iconRequests: {
		name: string;
		component: string;
		url: string;
		requesters: string;
		status: string;
	}[];
	offset: number;
	limit: number;
	pendingCount: number;
	doneCount: number;
}

export default function IconRequests(props: Props) {
	const iconRequests = props.iconRequests.map((request) => (
		<IconRequest
			key={request.component}
			name={request.name}
			component={request.component}
			url={request.url}
			requesters={request.requesters}
			status={request.status}
		/>
	));
	return <div>{iconRequests}</div>;
}
