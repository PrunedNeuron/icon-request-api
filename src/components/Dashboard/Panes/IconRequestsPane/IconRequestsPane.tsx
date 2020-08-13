import React, { useState } from "react";
import {
	IconRequestsPaneContainer,
	IconRequestsContainer,
	PaginationContainer
} from "./Styles";
import IconRequests from "../../IconRequests/IconRequests";
import { Pagination } from "@zeit-ui/react";
import { useRouter } from "next/router";
import {
	ChevronRightCircleFill,
	ChevronLeftCircleFill
} from "@zeit-ui/react-icons";

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

export default function IconRequestsPane(props: Props) {
	const router = useRouter();
	const [, setPage] = useState(1);
	const [offset, setOffset] = useState(props.offset);

	const handlePagination = (page: number) => {
		router.push(
			"/dashboard/[offset]/[limit]",
			`/dashboard/${(page - 1) * props.limit}/${props.limit}`
		);
		setPage(page + 1);
		setOffset((page - 1) * props.limit);
		console.log("Page =", page);
		console.log("Offset =", offset);
	};
	return (
		<IconRequestsPaneContainer>
			<>
				<IconRequestsContainer>
					<IconRequests
						iconRequests={props.iconRequests}
						offset={props.offset}
						limit={props.limit}
						pendingCount={props.pendingCount}
						doneCount={props.doneCount}
					/>
				</IconRequestsContainer>
				{props.limit == 0 ? (
					<></>
				) : (
					<PaginationContainer>
						<Pagination
							size="small"
							count={Math.ceil(props.pendingCount / props.limit)}
							onChange={handlePagination}
						>
							<Pagination.Next>
								<ChevronRightCircleFill />
							</Pagination.Next>
							<Pagination.Previous>
								<ChevronLeftCircleFill />
							</Pagination.Previous>
						</Pagination>
					</PaginationContainer>
				)}
			</>
		</IconRequestsPaneContainer>
	);
}
