import React, { Component } from "react";

import IconRequests from "./IconRequest/IconRequests";
import SideBar from "./SideBar/SideBar";
import { StyledDiv } from "./Styles"

export default class Body extends Component {
	render() {
		return (
			<StyledDiv>
				<IconRequests />
				<SideBar />
			</StyledDiv>
		);
	}
}
