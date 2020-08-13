import React from "react";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";
import { Image } from "@zeit-ui/react";

const NowPlaying = () => {
	const { data } = useSWR("/api/now-playing", fetcher);

	return (
		<>
			<Image
				src={data?.albumImageUrl || "/static/images/placeholder.jpg"}
			/>
			<p>Playing? {data && (data?.title || "Not Playing")}</p>

			<p>Artist = {data && (data?.artist || "Spotify")}</p>
		</>
	);
};

export default NowPlaying;
