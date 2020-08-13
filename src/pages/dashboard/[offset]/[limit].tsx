import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import axios from "axios";
import { BASE_URL, API_KEY } from "../../../utils/Constants";
import Dashboard from "../../../components/Dashboard/Dashboard";
import { useRouter } from "next/router";
import { Row, Loading } from "@zeit-ui/react";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { offset, limit } = context.params;

	const requests = (
		await axios({
			method: "GET",
			url: `${BASE_URL}/requests/${offset}/${limit}`,
			headers: {
				"X-API-KEY": API_KEY
			}
		})
	).data;

	const pendingCountResponse = (
		await axios({
			method: "GET",
			url: `${BASE_URL}/requests/count/pending`,
			headers: {
				"X-API-KEY": API_KEY
			}
		})
	).data;

	const doneCountResponse = (
		await axios({
			method: "GET",
			url: `${BASE_URL}/requests/count/done`,
			headers: {
				"X-API-KEY": API_KEY
			}
		})
	).data;

	return {
		props: {
			requests: requests,
			offset: offset,
			limit: limit,
			pendingCount: parseInt(pendingCountResponse.count),
			doneCount: parseInt(doneCountResponse.count)
		}
	};
};

export default function Requests({
	requests,
	offset,
	limit,
	pendingCount,
	doneCount
}) {
	const [signedIn, setSignedIn] = useState(false);

	const router = useRouter();

	useEffect(() => {
		const signedInUser = localStorage.getItem("user");
		if (signedInUser) {
			setSignedIn(true);
		} else router.push("/login");
	}, []);

	if (signedIn) {
		return (
			<Dashboard
				iconRequests={requests}
				offset={offset}
				limit={limit}
				pendingCount={pendingCount}
				doneCount={doneCount}
			/>
		);
	} else {
		return (
			<Row style={{ padding: "10px 0" }}>
				<Loading />
			</Row>
		);
	}
}
