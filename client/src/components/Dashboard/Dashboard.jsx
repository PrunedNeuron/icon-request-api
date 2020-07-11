import React, { Component } from "react";

import Body from "./Body/Body";
import Header from "./Header/Header";
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
