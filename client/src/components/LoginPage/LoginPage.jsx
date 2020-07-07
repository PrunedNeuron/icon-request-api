import React, { Component } from "react";
import Dashboard from "../Dashboard/Dashboard";
import axios from "axios";
import { Grid, Card, CardContent } from "@material-ui/core";
import { StyledLoginButton, StyledTextField } from "./Styles";
import { PUBLIC_URL } from "../Constants";

export default class LoginPage extends Component {
	constructor() {
		super();
		this.state = {
			isLoggedIn: false,
			username: "",
			password: "",
			validCredentials: false
		};

		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleLoginFormSubmit = this.handleLoginFormSubmit.bind(this);
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
	}

	async handleLoginFormSubmit(event) {
		event.preventDefault();
		const serverResponse = await axios({
			method: "POST",
			url: PUBLIC_URL + "/auth",
			data: {
				username: this.state.username,
				password: this.state.password
			}
		})
			.then((response) => response.data)
			.then((response) => {
				console.log("Response = " + JSON.stringify(response));
				this.setState({
					validCredentials: response.status == "SUCCESS",
					isLoggedIn: response.status == "SUCCESS"
				});
				if (response.status == "SUCCESS") {
					localStorage.setItem("user", response);
				}
			})
			.catch((error) => {
				console.log(error.message);
				this.setState({
					validCredentials: false,
					isLoggedIn: false
				});
			});

		return serverResponse;
	}

	handleUsernameChange(event) {
		this.setState({
			username: event.target.value
		});
	}

	handlePasswordChange(event) {
		this.setState({
			password: event.target.value
		});
	}

	handleKeyDown(event) {
		if (event.key === "Enter") console.log("Pressed enter.");
	}

	componentDidMount() {
		const loggedInUser = localStorage.getItem("user");
		if (loggedInUser) {
			const foundUser = JSON.parse(JSON.stringify(loggedInUser));
			console.log(foundUser);
			this.setState({
				isLoggedIn: true,
				validCredentials: true,
				username: foundUser.username
			});
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.validCredentials != this.state.validCredentials) {
			const loggedInUser = localStorage.getItem("user");
			if (loggedInUser) {
				const foundUser = JSON.parse(JSON.stringify(loggedInUser));
				console.log(foundUser);
				this.setState({
					isLoggedIn: true,
					validCredentials: true,
					username: foundUser.username
				});
			}
		}
	}

	render() {
		return this.state.isLoggedIn ? (
			<Dashboard />
		) : (
			<Card>
				<CardContent>
					<Grid
						container
						justify="center"
						spacing={0}
						direction="column"
						alignItems="center"
						style={{ minHeight: "100vh" }}
					>
						<div className="loginFormContainer">
							{/* Login form. */}
							<form
								className="loginForm"
								onSubmit={this.handleLoginFormSubmit}
							>
								<div>
									<StyledTextField
										id="standard-required"
										label="Username"
										variant="outlined"
										value={this.state.username}
										onChange={this.handleUsernameChange}
										required
									/>
									<br />
									<StyledTextField
										id="outlined-password-input"
										label="Password"
										type="password"
										autoComplete="current-password"
										variant="outlined"
										value={this.state.password}
										onChange={this.handlePasswordChange}
										// onKeyDown={this.handleKeyDown}
										required
									/>
								</div>
								<StyledLoginButton
									type="submit"
									variant="outlined"
									color="primary"
									value="Submit"
									onClick={this.handleLoginFormSubmit}
								>
									Login
								</StyledLoginButton>
							</form>
						</div>
					</Grid>
				</CardContent>
			</Card>
		);
	}
}
