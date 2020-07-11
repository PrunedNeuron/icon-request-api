import { API_KEY, BASE_URL, PUBLIC_URL } from "../../../Constants";

import { Card } from "@material-ui/core";
import IconRequest from "./IconRequest";
import React from "react";
import SideBar from "../SideBar/SideBar";
import { StyledPagination } from "./Styles";
import axios from "axios";

// const BASE_URL = "https://ayushm.dev/amphetamine/api/v1/requests/";

class IconRequests extends React.Component {
	constructor() {
		super();
		this.state = {
			isLoading: false,
			loaded: 0,
			iconRequests: [],
			size: 0,
			offset: 0,
			limit: 5,
			currentPage: 1,
			pages: 1
		};

		this.fetchIconRequests = this.fetchIconRequests.bind(this);
		this.fetchSize = this.fetchSize.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
	}

	async fetchIconRequests() {
		const serverResponse = await axios({
			method: "GET",
			url: `${BASE_URL}/requests/${this.state.offset}/${this.state.limit}`,
			headers: {
				"X-API-KEY": API_KEY
			}
		})
			.then((response) => response.data)
			.then((response) => {
				console.log("Response: " + response);
				this.setState({
					isLoading: false,
					iconRequests: response
				});
			});
		return serverResponse;
	}

	async fetchSize() {
		const serverResponse = await axios({
			method: "GET",
			url: `${BASE_URL}/requests/count`,
			headers: {
				"X-API-KEY": API_KEY
			}
		})
			.then((response) => response.data)
			.then((response) => {
				console.log();
				this.setState({
					size: response.count,
					pages: Math.floor(parseInt(response.count) / 5)
				});
			});
		return serverResponse;
	}

	handlePageChange(event, value) {
		this.setState({
			currentPage: value,
			offset: value * 5
		});
	}

	async componentDidMount() {
		this.setState({ loading: true });

		this.fetchSize();
		this.fetchIconRequests();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.currentPage != this.state.currentPage)
			this.fetchIconRequests();
	}

	render() {
		/* 		console.log("Size =", this.state.size);
		console.log("Pages =", this.state.pages);
 */ let components = this.state.iconRequests.map(
			(iconRequest) => {
				const icon = {
					id: iconRequest.id,
					name: iconRequest.name,
					component: iconRequest.component,
					url: iconRequest.url,
					requesters: iconRequest.requesters
				};

				return (
					<IconRequest
						key={icon.component}
						id={icon.id}
						name={icon.name}
						component={icon.component}
						url={icon.url}
						requesters={icon.requesters}
					/>
				);
			}
		);

		return (
			<>
				<div className="iconRequests">{components}</div>
				<StyledPagination
					count={this.state.pages}
					onChange={this.handlePageChange}
					showFirstButton
					showLastButton
				/>
			</>
		);
	}
}

export default IconRequests;
