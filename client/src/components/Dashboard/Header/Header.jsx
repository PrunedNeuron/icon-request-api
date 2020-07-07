import React, { Component } from "react";
import AppBar from "./AppBar/AppBar";

export default class Header extends Component {
	constructor() {
		super();
	}
	handleLogout() {
		localStorage.clear();
		window.location.replace("/");
	}
	render() {
		return (
			<>
				<AppBar />
			</>
		);
	}
}
