import axios from "axios";
import querystring from "querystring";

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
	const {
		SPOTIFY_CLIENT_ID: client_id,
		SPOTIFY_CLIENT_SECRET: client_secret,
		SPOTIFY_REFRESH_TOKEN: refresh_token
	} = process.env;

	const basic = Buffer.from(`${client_id}:${client_secret}`).toString(
		"base64"
	);

	const response = await axios({
		method: "POST",
		url: TOKEN_ENDPOINT,
		headers: {
			Authorization: `Basic ${basic}`,
			"Content-Type": "application/x-www-form-urlencoded"
		},
		data: querystring.stringify({
			grant_type: "refresh_token",
			refresh_token
		})
	}).then((response) => response.data);

	// console.log(response.data);
	return response;
};

export default async () => {
	const { access_token } = await getAccessToken();
	const response = await axios({
		url: NOW_PLAYING_ENDPOINT,
		headers: {
			Authorization: `Bearer ${access_token}`
		}
	});

	const { status } = response;

	if (status === 204 || status > 400) {
		return { status: 200, isPlaying: false };
	}

	const song = await response.data;
	// console.log(song);

	const isPlaying = song.is_playing;
	const title = song.item.name;
	const artist = song.item.artists.map((_artist) => _artist.name).join(", ");
	const album = song.item.album.name;
	const albumImageUrl = song.item.album.images[0].url;
	const songUrl = song.item.external_urls.spotify;

	return {
		status: 200,
		album,
		albumImageUrl,
		artist,
		isPlaying,
		songUrl,
		title
	};
};
