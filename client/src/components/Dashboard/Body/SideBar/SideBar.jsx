import { Card, Grid, Typography } from "@material-ui/core";
import React, { Component } from "react";

import {StyledDiv} from './Styles';

export default class SideBar extends Component {
	render() {
		return (
			<StyledDiv id="sidebarContainer">
				<Grid>
					<Card>
						<Typography>Hello World</Typography>
					</Card>
				</Grid>
			</StyledDiv>
		);
	}
}
