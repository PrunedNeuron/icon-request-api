import React, { useEffect } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
	const router = useRouter();
	const limit = 4;
	useEffect(() => {
		router.prefetch(
			"/dashboard/[offset]/[limit]",
			`/dashboard/${limit}/${limit}`
		);
		router.push("/dashboard/[offset]/[limit]", `/dashboard/0/${limit}`);
	}, []);
	return <div></div>;
}
