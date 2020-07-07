import React, { Component } from "react";
import Header from "./Header/Header";
import Body from "../Body/Body";
// import Footer from "../Footer/Footer";

export default class Dashboard extends Component {
	render() {
		return (
			<>
				<Header />
				<Body />
				{/* <Footer /> */}
			</>
		);
	}
}
