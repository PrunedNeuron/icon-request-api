import React from "react";
import CardActions from "@material-ui/core/CardActions";
import { ButtonGroup, Button, ThemeProvider } from "@material-ui/core";
import { PrimaryTheme, SecondaryTheme } from "../../Constants";
import Axios from "axios";

import { BASE_URL, API_KEY } from "../../Constants";

import {
	StyledButton,
	StyledDoneIcon,
	StyledLinkIcon,
	StyledCopyIcon
} from "./Styles";

class Actions extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			copied: false,
			ticked: false
		};
		this.handleCopyClick = this.handleCopyClick.bind(this);
		this.handleTickClick = this.handleTickClick.bind(this);
	}

	handleCopyClick() {
		if (this.state.copied == true) return;
		navigator.clipboard.writeText(this.props.component);
		this.setState({ copied: true });
		setTimeout(() => this.setState({ copied: false }), 3000);
	}

	handleTickClick() {
		// mark as complete
		Axios({
			method: "PUT",
			url: BASE_URL + "/requests/update/component",
			data: {
				component: this.props.component,
				status: "done"
			},
			headers: {
				"X-API-KEY": API_KEY
			}
		})
			.then((response) => response.data)
			.then((response) => {
				if (response.status === "SUCCESS")
					this.setState({ ticked: true });
				else console.log("FAILED TO UPDATE ICON REQUEST.");
			});
		// set ticked to true and disable it
	}

	render() {
		return (
			<CardActions>
				<ThemeProvider theme={PrimaryTheme}>
					<ButtonGroup
						color="primary"
						aria-label="outlined primary button group"
					>
						<StyledButton
							href={this.props.url}
							target="_blank"
							rel="noreferrer"
						>
							<StyledLinkIcon />
						</StyledButton>
						<StyledButton
							disabled={this.state.copied}
							target="_blank"
							rel="noreferrer"
							onClick={this.handleCopyClick}
						>
							{/* {this.state.copied ? "COPIED!" : "COPY"} */}
							{this.state.copied ? (
								<>
									<StyledCopyIcon disabled /> COPIED!
								</>
							) : (
								<StyledCopyIcon />
							)}
						</StyledButton>
						<Button
							disabled={this.state.ticked}
							onClick={this.handleTickClick}
						>
							{this.state.ticked ? (
								<ThemeProvider theme={SecondaryTheme}>
									<StyledDoneIcon color="primary" />
								</ThemeProvider>
							) : (
								<StyledDoneIcon />
							)}
						</Button>
					</ButtonGroup>
				</ThemeProvider>
			</CardActions>
		);
	}
}

export default Actions;
