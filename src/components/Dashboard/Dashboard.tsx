import React from "react";

import DashboardHeader from "./Header/DashboardHeader";
import IconRequestsPane from "./Panes/IconRequestsPane/IconRequestsPane";
import { Progress, Spacer, Page } from "@zeit-ui/react";
import StatsPane from "./Panes/StatsPane/StatsPane";
import { DashboardContainer } from "./Styles";

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

export default function Dashboard(props: Props) {
	return (
		<Page size="large" render="effect-seo">
			<Page.Content>
				<DashboardHeader />
				<DashboardContainer>
					<IconRequestsPane
						iconRequests={props.iconRequests}
						offset={props.offset}
						limit={props.limit}
						pendingCount={props.pendingCount}
						doneCount={props.doneCount}
					/>
					<StatsPane
						iconRequests={props.iconRequests}
						offset={props.offset}
						limit={props.limit}
						pendingCount={props.pendingCount}
						doneCount={props.doneCount}
					/>
				</DashboardContainer>
			</Page.Content>
		</Page>
	);
}
